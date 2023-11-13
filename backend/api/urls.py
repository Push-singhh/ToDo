from django.urls import path

from . import views


urlpatterns = [
    path('', views.api_home),
    path('list_post', views.list_post)
]
