from rest_framework import generics, authentication, permissions

from .models import Category
from .serializers import CategorySerializer
from api.mixins import UserQuerySetMixin


class CategoryListCreateAPIView(UserQuerySetMixin,
                                generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    # def get_queryset(self, *args, **kwargs):
    #     qs = super().get_queryset()
    #     user = self.request.user
    #     if not user.is_authenticated:
    #         return Category.objects.none()
    #     return qs.filter(user=self.request.user)


category_list_create_view = CategoryListCreateAPIView.as_view()


class CategoryDetailAPIView(generics.RetrieveAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


category_detail_view = CategoryDetailAPIView.as_view()


class CategoryUpdateAPIView(generics.UpdateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    lookup_field = 'pk'


category_update_view = CategoryUpdateAPIView.as_view()


class CategoryDestroyAPIView(UserQuerySetMixin,
                             generics.DestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    lookup_field = 'pk'


category_destroy_view = CategoryDestroyAPIView.as_view()
