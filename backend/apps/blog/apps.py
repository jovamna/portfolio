from django.apps import AppConfig


class BlogConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'apps.blog'
    
    def ready(self):
        import apps.blog.signals  # importa las señales al iniciar la app
