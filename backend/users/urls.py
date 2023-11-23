from django.urls import path

from .views import CustomAuthToken, UserViewSet, register_user_api_view


urlpatterns = [
    path('register', register_user_api_view),
    path('auth/api-token-auth', CustomAuthToken.as_view()),
    path('', UserViewSet.as_view({'post': 'create'}))
]