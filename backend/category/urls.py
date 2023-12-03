from django.urls import path

from . import views

urlpatterns = [
    path('', views.category_list_create_view),
    path('<int:pk>', views.category_detail_view),
    path('<int:pk>/update', views.category_update_view),
    path('<int:pk>/delete', views.category_destroy_view),

]
