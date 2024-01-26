from rest_framework import serializers
from django.utils import timezone

from .models import Task


class TaskSerializer(serializers.ModelSerializer):

    class Meta:
        model = Task
        fields = [
            'id',
            'category',
            'task',
            'note',
            'position',
            'created_at',
            'completed_at'
        ]

    def update(self, instance, validated_data):
        if 'completed_at' in validated_data:
            if validated_data.get('completed_at'):
                instance.completed_at = timezone.now()
            else:
                instance.completed_at = None

        validated_data.pop("completed_at", None)
        instance.save()
        return instance
