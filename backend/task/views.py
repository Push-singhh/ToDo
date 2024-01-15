from rest_framework import generics, status
from django.db.models import F

from .models import Task
from .serializers import TaskSerializer
from django.db import transaction
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError


class TaskListCreateAPIView(generics.ListCreateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

    def create(self, request, *args, **kwargs):

        last_record = self.get_queryset().last()
        if last_record:
            last_position = last_record.position
        else:
            last_position = 0
        data = request.data
        data.update({"position": last_position + 1})
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        """
        Return Tasks of currently authenticated user
        """

        user = self.request.user
        category_id = self.request.query_params.get("category_id")
        if not category_id:
            category_id = self.request.data.get('category')
        if not category_id:
            raise ValidationError(detail="category is mandatory get task list")
        return Task.objects.filter(user=user, category=category_id).order_by('position')


task_list_create_view = TaskListCreateAPIView.as_view()


class TaskDetailAPIView(generics.RetrieveAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer


task_detail_view = TaskDetailAPIView.as_view()


class TaskUpdateAPIView(generics.UpdateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        if (request.data.get('position') and instance.position and
                instance.position != request.data.get('position')):
            self.move_tasks(instance.position, request.data.get('position'))
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)

    @transaction.atomic
    def move_tasks(self, current_position, new_position):
        if current_position < new_position:
            Task.objects.filter(position__lte=new_position,
                                position__gt=current_position).update(position=F("position") - 1)
        elif current_position > new_position:
            Task.objects.filter(position__lt=current_position,
                                position__gte=new_position).update(position=F("position") + 1)


task_update_view = TaskUpdateAPIView.as_view()
