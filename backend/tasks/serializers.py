from rest_framework import serializers

from .models import TaskCategory


class TaskCategorySerializer(serializers.ModelSerializer):
    custom_lower_title = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = TaskCategory
        fields = [
            'title',
            'view_title',
            'custom_lower_title'
        ]

    def get_custom_lower_title(self, obj):
        if not isinstance(obj, TaskCategory):
            return None

        return str(obj.lower_title())


