
from django.contrib import admin
from .models import Review

class ReviewAdmin(admin.ModelAdmin):
    list_display = ('id', 'title' ,'post','hearts', 'published_date',  )
    list_display_links = ('id', 'hearts' )
    list_filter = ('hearts', )
    search_fields = ('comment', )
    list_per_page = 25

admin.site.register(Review, ReviewAdmin)
