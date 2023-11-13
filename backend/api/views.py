from django.forms.models import model_to_dict
from rest_framework.decorators import api_view
from rest_framework.response import Response

from tasks.models import TaskCategory
from tasks.serializers import TaskCategorySerializer


@api_view(["GET"])
def api_home(request, *args, **kwargs):
    # This is a function based view

    instance = TaskCategory.objects.all().first()
    data = {}
    if instance:
        data = TaskCategorySerializer(instance).data

    return Response(data)


@api_view(["POST"])
def list_post(request, *args, **kwargs):
    # This is a function based view

    serializer = TaskCategorySerializer(data=request.data)
    data = {}
    if serializer.is_valid():
        return Response(serializer.data)

        # instance = serializer.save()

    return Response(serializer.data)
