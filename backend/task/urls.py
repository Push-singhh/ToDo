from django.urls import path

from .views import task_list_create_view

urlpatterns = [
    path('', task_list_create_view)
]