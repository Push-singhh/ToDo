from rest_framework import generics

from .models import Category
from .serializers import CategorySerializer


class CategoryListCreateAPIView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    # def perform_create(self, serializer):
    #     print(serializer)
    #     serializer.save()


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


class CategoryDestroyAPIView(generics.DestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    lookup_field = 'pk'


category_destroy_view = CategoryDestroyAPIView.as_view()
