from rest_framework import serializers

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