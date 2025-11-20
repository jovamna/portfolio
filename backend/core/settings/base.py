import os
import environ
from pathlib import Path
import django
from django.utils.translation import gettext
django.utils.translation.ugettext = gettext



env = environ.Env()
environ.Env.read_env()
ENVIRONMENT = env

#DEBUG = (bool, False)

DEBUG = True
ALLOWED_HOSTS = ['*']

SECRET_KEY=os.environ.get('SECRET_KEY')


#ADMIN_URL = env('ADMIN_URL', default='notadmin123/')
SECRET_ADMIN_URL=env('SECRET_ADMIN_URL')


# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent.parent

#seo
SITE_ID = 1
# Application definition

DJANGO_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.sites', #seo
    'django.contrib.sitemaps', #seo
  
]

PROJECT_APPS = [
    'apps.user',
    'apps.myprojects',
    'apps.contacts',
    'apps.blog',
    'apps.category',
    'apps.chatbot',
    'apps.reviews',
   
]

THIRD_PARTY_APPS = [
    'corsheaders',
    'rest_framework',
    'rest_framework_simplejwt',
    'coreapi',
   'tinymce',
]

INSTALLED_APPS = DJANGO_APPS + PROJECT_APPS + THIRD_PARTY_APPS

#pip install django-tinymce

TINYMCE_DEFAULT_CONFIG = {
    'theme': 'silver',
    'height': 500,
    'menubar': False,
    'plugins': 'lists link image preview code',
    'toolbar': (
        'undo redo | '
        'styleselect | '
        'bold italic underline | '
        'alignleft aligncenter alignright | '
        'bullist numlist | '
        'link image | '
        'code'
    ),
    # Menú desplegable con tipos de texto (títulos)
    'block_formats': 'Párrafo=p; Título 1=h1; Título 2=h2; Título 3=h3',
}





LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
        },
    },
    'root': {
        'handlers': ['console'],
        'level': 'DEBUG',
    },
}




REST_FRAMEWORK = {
     'DEFAULT_PERMISSION_CLASSES':(
         'rest_framework.permissions.IsAuthenticated',
         
         'rest_framework.permissions.AllowAny'
    ),
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
      
    ),

   
}



MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware', 
    'django.middleware.security.SecurityMiddleware',    
    'whitenoise.middleware.WhiteNoiseMiddleware', 
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
   
]

ROOT_URLCONF = 'core.urls'

CORS_ALLOWED_ORIGINS = [
    'http://localhost:5173',
    'https://www.jovamnamedina.com',
    'https://jovamnamedina.com',
]

CORS_ORIGIN_WHITELIST = [
    'http://localhost:5173',
    'http://localhost:8000',
    'http://127.0.0.1:5173',
    'http://127.0.0.1:8000',
    'https://www.jovamnamedina.com',
    'https://jovamnamedina.com',
]

CSRF_TRUSTED_ORIGINS = [
    'http://localhost:5173',
    'http://localhost:8000',
    'http://127.0.0.1:5173',
    'http://127.0.0.1:8000',
    'https://www.jovamnamedina.com',
    'https://jovamnamedina.com',
]

CSRF_CONFIG_DOMAIN = "jovamnamedina.com"

if not DEBUG:
    ALLOWED_HOSTS = [
        ".jovamnamedina.com",
        "jovamnamedina.com",
        "www.jovamnamedina.com",
    ]
    CORS_ORIGIN_WHITELIST = env.list('CORS_ORIGIN_WHITELIST_DEPLOY')
    CSRF_TRUSTED_ORIGINS = env.list('CORS_TRUSTED_ORIGIN_DEPLOY')



#os.path.join(BASE_DIR, 'templates/emails')

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
           'DIRS': [os.path.join(os.path.dirname(BASE_DIR), 'frontend', 'dist'),
                    os.path.join(BASE_DIR, 'templates/emails')
                    ],
           
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'core.wsgi.application'

#AUTHENTIFICATION DE BACKENDS
AUTHENTICATION_BACKENDS = (
    'django.contrib.auth.backends.ModelBackend',
)

FILE_UPLOAD_PERMISSIONS = 0o640
PASSWORD_HASHERS = [
    "django.contrib.auth.hashers.Argon2PasswordHasher",
    "django.contrib.auth.hashers.PBKDF2PasswordHasher",
    "django.contrib.auth.hashers.PBKDF2SHA1PasswordHasher",
    "django.contrib.auth.hashers.BCryptSHA256PasswordHasher",
]
# Password validation
# https://docs.djangoproject.com/en/4.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.1/topics/i18n/

LANGUAGE_CODE = 'es-es'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.1/howto/static-files/

STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles') #ruta django, creada al hacer collectstatic
STATIC_URL = '/assets/' #ruta django de la carpeta staticfiles/assets

#ruta frontend, creada al hacer npm run build en el frontend
STATICFILES_DIRS = [
    #os.path.join(BASE_DIR, 'your_app/static'),  # Archivos estáticos de Django
    os.path.join(os.path.dirname(BASE_DIR), 'frontend', 'dist', 'assets'),
]



MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
MEDIA_URL = '/media/'


STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
EMAIL_BACKEND='django.core.mail.backends.console.EmailBackend'

AUTH_USER_MODEL = 'user.User'



