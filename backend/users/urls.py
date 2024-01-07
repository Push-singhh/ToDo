from django.urls import path

from .views import CustomAuthToken, users_detail_update_view, register_user_api_view


urlpatterns = [
    path('register', register_user_api_view),
    path('auth/login', CustomAuthToken.as_view()),
    path('<int:pk>', users_detail_update_view),
    path('<int:pk>/update', users_detail_update_view)
]