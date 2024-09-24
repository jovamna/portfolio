from django.contrib import admin

# Register your models here.
from django.contrib import admin
from . import models
# Register your models here.


@admin.register(models.User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'email', 'is_staff', 'is_editor')
    search_fields = ('first_name', 'last_name', 'email', 'is_staff', 'is_editor',)
