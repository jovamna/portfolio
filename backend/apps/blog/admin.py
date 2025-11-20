from django.contrib import admin

# Register your models here.
from .models import *


class PostAdmin(admin.ModelAdmin):
    list_display = ('id', 'title' , 'slug', 'category', 'published')
    list_display_links = ('id',  )
    list_filter = ('author', 'category')
    search_fields = ('content', 'narrative',)
    list_per_page = 25


admin.site.register(PostViewCount)
admin.site.register(Post, PostAdmin)







