from django.urls import path

from . import views

urlpatterns = [
    path('category/', views.task_category_list_create_view),
    path('category/<int:pk>', views.task_category_detail_view),
    path('category/<int:pk>/update', views.task_category_update_view),
    path('category/<int:pk>/delete', views.task_category_destroy_view),

]