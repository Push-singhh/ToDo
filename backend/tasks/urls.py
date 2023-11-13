from django.urls import path

from . import views

urlpatterns = [
    path('', views.task_category_list_create_view),
    path('<int:pk>', views.task_category_detail_view),

]