from rest_framework import serializers
from rest_framework.validators import UniqueValidator


from .models import Category
from .validators import unique_category_title, UniqueCategoryValidator


class CategorySerializer(serializers.ModelSerializer):
    title = serializers.CharField(validators=[UniqueCategoryValidator("title")])

    class Meta:
        model = Category
        fields = [
            'id',
            'title',
            'description',
            'view_title',
            'position',
            'created_at',
            'num_of_active_task'
        ]
