from django.http import JsonResponse


def api_home(request, *args, **kwargs):
    # This is a function based view
    return JsonResponse({"message": "This is my first django api"})
