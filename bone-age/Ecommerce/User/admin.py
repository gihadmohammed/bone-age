# from django.contrib import admin
# from django.contrib.auth.admin import UserAdmin
# from django.utils.translation import gettext_lazy as _
# from .models import User

# admin.site.site_header = 'Ecs E-commerce administration'

# class CustomUserAdmin(UserAdmin):
#     fieldsets = (
#         (None, {'fields': ('username','email', 'password')}),
#         (_('Personal info'), {'fields': ('first_name', 'last_name', 'PhoneNumber',  'Img', 'Gender')}),
#         (_('Permissions'), {
#             'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions'),
#         }),
#         (_('Important dates'), {'fields': ('last_login', 'date_joined')}),
#     )
#     list_filter = ('is_active', 'is_staff', 'is_superuser', 'groups', 'Gender')   
#     list_display = ('username','email', 'first_name', 'last_name', 'PhoneNumber', 'DisplayName', 'Img', 'Gender', 'is_active', 'is_staff')
#     search_fields = ('email', 'first_name', 'last_name', 'PhoneNumber', 'DisplayName', 'Gender')
#     ordering = ('email',)
#     def get_readonly_fields(self, request, obj=None):
#         readonly_fields = super().get_readonly_fields(request, obj)
#         if obj:
#             readonly_fields += ('last_login', 'date_joined')
#         return readonly_fields

# admin.site.register(User, CustomUserAdmin)
