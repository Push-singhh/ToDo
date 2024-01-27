from rest_framework import generics, authentication, permissions, status
from rest_framework.response import Response

from .models import Category
from task.models import Task
from .serializers import CategorySerializer
from api.mixins import UserQuerySetMixin
from task.views import move_item
from rest_framework.exceptions import ValidationError


class CategoryListCreateAPIView(UserQuerySetMixin,
                                generics.ListCreateAPIView):
    serializer_class = CategorySerializer

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
        Return Categories of currently authenticated user
        """

        user = self.request.user
        return Category.objects.filter(user=user, deleted_at=None).order_by('position')


category_list_create_view = CategoryListCreateAPIView.as_view()


class CategoryDetailAPIView(generics.RetrieveAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


category_detail_view = CategoryDetailAPIView.as_view()


class CategoryUpdateAPIView(generics.UpdateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        if (request.data.get('position') and instance.position and
                instance.position != request.data.get('position')):
            move_item(instance.position, request.data.get('position'), Category)
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)


category_update_view = CategoryUpdateAPIView.as_view()


class CategoryDestroyAPIView(UserQuerySetMixin, generics.DestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    lookup_field = 'pk'

    def perform_destroy(self, instance):
        # Deleting tasks of category being deleted
        Task.objects.filter(category=instance.id).delete()

        instance.delete()



category_destroy_view = CategoryDestroyAPIView.as_view()
