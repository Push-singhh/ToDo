from rest_framework import generics, status

from .models import Task
from .serializers import TaskSerializer
from .position import change_task_position, shift_task_after_completion, insert_back_to_active_task
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError

from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
channel_layer = get_channel_layer()


class TaskListCreateAPIView(generics.ListCreateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

    def create(self, request, *args, **kwargs):
        # Adding task being created at last position of active tasks
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
        completed = self.request.query_params.get("completed")
        if not category_id:
            category_id = self.request.data.get('category')
        if not category_id:
            raise ValidationError(detail="category is mandatory get task list")

        filter_dict = {
            "user": user,
            "category": category_id,
        }
        if completed == "true":
            filter_dict.update({"completed_at__isnull": False})
        else:
            filter_dict.update({"completed_at__isnull": True})

        return Task.objects.filter(**filter_dict).order_by('position')


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
            # Shuffling tasks
            change_task_position(instance.position, request.data.get('position'), instance.category)
            instance.position = request.data.get('position')
            # TODO: why is necessary to change instance value here when data is already in serializer
        elif request.data.get('completed_at') and instance.position:
            # Shifting tasks in position of task being completed
            shift_task_after_completion(instance.position, instance.category)
        elif 'completed_at' in request.data and not request.data.get('completed_at'):
            # Here the completed task is being marked active
            # So we are trying to insert task at its previous position
            item_position = insert_back_to_active_task(instance.position, instance.category)
            instance.position = item_position

        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        async_to_sync(channel_layer.group_send)(str(instance.user.id), {"type": "todo_update_event",
                                                                        "update_event": "task_detail"})
        async_to_sync(channel_layer.group_send)(str(instance.user.id), {"type": "todo_update_event",
                                                                        "update_event": "task_list"})
        return Response(serializer.data)


task_update_view = TaskUpdateAPIView.as_view()


class TaskDeleteAPIView(generics.DestroyAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

    def perform_destroy(self, instance=None):
        instance.delete()


task_delete_view = TaskDeleteAPIView.as_view()
