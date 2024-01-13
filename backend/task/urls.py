from django.urls import path

from .views import task_list_create_view, task_detail_view

urlpatterns = [
    path('', task_list_create_view),
    path('<int:pk>', task_detail_view)
]