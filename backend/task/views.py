from rest_framework import generics

from .models import Task
from .serializers import TaskSerializer


class TaskListCreateAPIView(generics.ListCreateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        """
        Return Tasks of currently authenticated user
        """

        user = self.request.user
        category_id = self.request.query_params.get("category_id")
        return Task.objects.filter(user=user, category=category_id)


task_list_create_view = TaskListCreateAPIView.as_view()


class TaskDetailAPIView(generics.RetrieveAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer


task_detail_view = TaskDetailAPIView.as_view()


