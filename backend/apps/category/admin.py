from django.contrib import admin
from .models import Category

class CategoryAdmin(admin.ModelAdmin):
    list_display = ("id", "indented_name", "parent", "slug", "views")
    list_display_links = ("id", "indented_name")
    list_filter = ("parent", )
    search_fields = ("name", "slug")
    list_per_page = 25

    def indented_name(self, obj):
        """Muestra subcategorías con una indentación visual."""
        if obj.parent:
            return f"— {obj.name}"  # Puedes usar más guiones si quieres más indentación
        return obj.name

    indented_name.short_description = "Category"

admin.site.register(Category, CategoryAdmin)
