from django.db import models


# Create your models here.
class Category(models.Model):
    class Meta:
        verbose_name = 'Category'
        verbose_name_plural = 'Categories'

    parent = models.ForeignKey(
        'self', related_name='children', on_delete=models.CASCADE, blank=True, null=True)
    
    name = models.CharField(max_length=200, unique=True)
    thumbnail = models.ImageField(upload_to='media/categories/', blank=True, null=True)
    slug = models.SlugField(max_length=255, unique=True)
    views = models.IntegerField(default=0, blank=True, verbose_name="Vistas")

    def __str__(self):
        return self.name

    def get_thumbnail(self):
        if self.thumbnail:
            return self.thumbnail.url
        return ''
    
    def get_view_count(self):
        views = CategoryViewCount.objects.filter(category=self).count()
        return views
    


class CategoryViewCount(models.Model):
    category = models.ForeignKey(Category, related_name='category_view_count', on_delete=models.CASCADE)
    ip_address = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.ip_address}"

    
    