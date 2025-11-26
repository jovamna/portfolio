from django.contrib import admin
from django import forms
from .models import Post, PostViewCount


class PostAdminForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = '__all__'

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if self.instance.pk:
            # Excluir el mismo producto de la lista de relacionados
            self.fields['related_products'].queryset = Post.objects.exclude(pk=self.instance.pk)

class PostAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'slug', 'category', 'published', 'updated_at')
    readonly_fields = ('updated_at',)
    list_display_links = ('id', )
    list_filter = ('author', 'category')
    search_fields = ('content', 'narrative',)
    list_per_page = 25
    filter_horizontal = ('related_products',)


admin.site.register(PostViewCount)
admin.site.register(Post, PostAdmin)







