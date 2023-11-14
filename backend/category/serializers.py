from rest_framework import serializers

from .models import Category


class CategorySerializer(serializers.ModelSerializer):
    custom_lower_title = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Category
        fields = [
            'title',
            'description',
            'view_title',
            'custom_lower_title'
        ]

    def get_custom_lower_title(self, obj):
        if not isinstance(obj, Category):
            return None

        return str(obj.lower_title())


