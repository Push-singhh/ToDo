from rest_framework import serializers
from rest_framework.validators import UniqueValidator


from .models import Category
from .validators import unique_category_title, UniqueCategoryValidator


class CategorySerializer(serializers.ModelSerializer):
    custom_lower_title = serializers.SerializerMethodField(read_only=True)
    title = serializers.CharField(validators=[UniqueCategoryValidator("title")])

    class Meta:
        model = Category
        fields = [
            'id',
            'title',
            'description',
            'view_title',
            'custom_lower_title',
            'position'
        ]

    def get_custom_lower_title(self, obj):
        if not isinstance(obj, Category):
            return None

        return str(obj.lower_title())


