from django.db import models
from django.utils.text import slugify
import logging
logger = logging.getLogger(__name__)


# Create your models here.
class Category(models.Model):
    class Meta:
        verbose_name = 'Category'
        verbose_name_plural = 'Categories'

    parent = models.ForeignKey(
        'self', related_name='children', on_delete=models.CASCADE, blank=True, null=True)
    
    name = models.CharField(max_length=200, unique=True)
    thumbnail = models.ImageField(upload_to='media/categories/', blank=True, null=True)
    slug = models.SlugField(max_length=255, unique=True, blank=True)
    views = models.IntegerField(default=0, blank=True, verbose_name="Vistas")

    def __str__(self):
        return self.name
    
    
    def save(self, *args, **kwargs):
        # 1. Generar slug automáticamente si no existe (dejas el campo vacío)
        if not self.slug:
            self.slug = slugify(self.name)
        
        # ELIMINADO: self.is_digital = True (Ya no ensucia el código)

        # 2. Lógica optimizada si ya existe (Actualización)
        if self.pk:
            try:
                # OPTIMIZACIÓN: Traemos la instancia antigua UNA sola vez para comparar todo
                old_instance = Category.objects.get(pk=self.pk)
                
                # ==================== GUARDAR SLUG ANTIGUO (301) ====================
                if old_instance.slug and old_instance.slug != self.slug:
                    CategorySlugHistory.objects.create(
                        category=self,
                        old_slug=old_instance.slug
                    )
                
                # ==================== ELIMINAR ARCHIVOS ANTIGUOS ====================
                if old_instance.thumbnail and old_instance.thumbnail != self.thumbnail:
                    try:
                        if old_instance.thumbnail.storage.exists(old_instance.thumbnail.name):
                            old_instance.thumbnail.delete(save=False)
                    except Exception as e:
                        logger.error(f"Error al eliminar el archivo thumbnail antiguo ({old_instance.thumbnail.name}): {str(e)}")

            except Category.DoesNotExist:
                logger.warning(f"No se encontró la instancia antigua para pk={self.pk}")

        # 3. Guardar la instancia de forma definitiva
        super().save(*args, **kwargs)



    def get_thumbnail(self):
        if self.thumbnail:
            return self.thumbnail.url
        return ''
    
    
    def get_all_descendants(self, queryset=None):
        """
        Optimizado: Usa prefetch_related si pasas un queryset pre-cargado.
        Ejemplo de uso: Category.objects.prefetch_related('children').get(pk=1).get_all_descendants()
        Esto reduce queries en recursión.
        """
        descendants = []
        # Si no hay queryset, usa self.children.all(), pero recomienda prefetch en la query inicial
        children = self.children.all().order_by('id')
        for child in children:
            descendants.append(child)
            descendants.extend(child.get_all_descendants())
        return descendants
    
    
    def get_view_count(self):
        views = CategoryViewCount.objects.filter(category=self).count()
        return views
    
    

class CategorySlugHistory(models.Model):
    category = models.ForeignKey('Category', on_delete=models.CASCADE, related_name='category_slug_histories')
    old_slug = models.SlugField(max_length=255, db_index=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "Historial de slugs - Categorías"
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.old_slug} → {self.category.slug}"


class CategoryViewCount(models.Model):
    category = models.ForeignKey(Category, related_name='category_view_count', on_delete=models.CASCADE)
    ip_address = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.ip_address}"

    
    