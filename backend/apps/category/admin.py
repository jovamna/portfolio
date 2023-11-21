from django.contrib import admin

# Register your models here.
from .models import *


class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name' , 'slug')
    list_display_links = ('id',  )
    list_filter = ('slug', 'name')
   
    list_per_page = 25



admin.site.register(Category, CategoryAdmin)

