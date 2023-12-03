class UserQuerySetMixin:
    user_field = 'user'

    def get_queryset(self, *args, **kwargs):
        lookup_data = {self.user_field: self.request.user}
        qs = super().get_queryset()
        return qs.filter(**lookup_data)
