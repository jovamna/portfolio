from django.contrib import admin
from apps.myprojects import models
# Register your models here.
from .models import *






#admin.site.register(Project, ProjectAdmin)
#admin.site.register(Authors,AuthorsAdmin)
#admin.site.register(Tag,TagAdmin)
#admin.site.register(Category.CategoryAdmin)
admin.site.register(Project)
admin.site.register(Tag)
admin.site.register(Authors)
admin.site.register(Category)

admin.site.register(ViewCount)

