# Importa la configuración base
from .base import *
from .jwt import *



# Configuración específica para el entorno de producción

DEBUG = False

# Configuración de la base de datos para producción (por ejemplo, PostgreSQL)
ALLOWED_HOSTS = ['localhost', 'jovamnamedina.com', 'www.jovamnamedina.com', '104.248.82.51']


SECRET_KEY=os.environ.get('SECRET_KEY')

DATABASES = {
    "default" : env.db("DATABASE_URL", default="postgres:///portfolio"),
}


# Configuración de correo electrónico para producción
#email config
EMAIL_BACKEND = 'django.core.mail.backends.locmem.EmailBackend'
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = env('EMAIL_HOST')
EMAIL_HOST_USER = env('EMAIL_HOST_USER')
EMAIL_HOST_PASSWORD = env('EMAIL_HOST_PASSWORD')
EMAIL_PORT = env('EMAIL_PORT')
EMAIL_USE_TLS = True
DEFAULT_FROM_EMAIL = EMAIL_HOST_USER
#EMAIL_USE_TLS = False


# Otras configuraciones específicas de producción
