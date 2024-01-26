from django.urls import path

from .views import task_list_create_view, task_detail_view, task_update_view, task_delete_view

urlpatterns = [
    path('', task_list_create_view),
    path('<int:pk>', task_detail_view),
    path('<int:pk>/update', task_update_view),
    path('<int:pk>/delete', task_delete_view)
]
