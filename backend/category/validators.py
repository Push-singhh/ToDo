from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from .models import Category

unique_category_title = UniqueValidator(queryset=Category.objects.all(), lookup='iexact')


class UniqueCategoryValidator:
    requires_context = True

    def __init__(self, field_name):
        self.field_name = field_name

    def __call__(self, value, serializer):
        user = serializer.context['request'].user
        # Check if a record with the same title value exists for the user
        filter_params = {'title__iexact': value, 'user': user}
        if Category.objects.filter(**filter_params).exists():
            raise serializers.ValidationError(f'{self.field_name} field must be unique.')

        return value
