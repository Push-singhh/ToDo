from rest_framework import generics

from .models import TaskCategory
from .serializers import TaskCategorySerializer


class TaskCategoryListCreateAPIView(generics.ListCreateAPIView):
    queryset = TaskCategory.objects.all()
    serializer_class = TaskCategorySerializer

    # def perform_create(self, serializer):
    #     print(serializer)
    #     serializer.save()


task_category_list_create_view = TaskCategoryListCreateAPIView.as_view()


class TaskCategoryDetailAPIView(generics.RetrieveAPIView):
    queryset = TaskCategory.objects.all()
    serializer_class = TaskCategorySerializer


task_category_detail_view = TaskCategoryDetailAPIView.as_view()


class TaskCategoryUpdateAPIView(generics.UpdateAPIView):
    queryset = TaskCategory.objects.all()
    serializer_class = TaskCategorySerializer
    lookup_field = 'pk'


task_category_update_view = TaskCategoryUpdateAPIView.as_view()


class TaskCategoryDestroyAPIView(generics.DestroyAPIView):
    queryset = TaskCategory.objects.all()
    serializer_class = TaskCategorySerializer
    lookup_field = 'pk'


task_category_destroy_view = TaskCategoryDestroyAPIView.as_view()