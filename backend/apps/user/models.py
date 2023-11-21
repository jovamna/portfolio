from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin
import os
from rest_framework_simplejwt.tokens import RefreshToken


class UserManager(BaseUserManager):
    #NO NECESITA CONTRASEÑA
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Users must have an email address')
        
        
        user= self.model(email=self.normalize_email(email), **extra_fields)
        #user = self.model(email=email, **extra_fields) #1
        user.set_password(password) #2
        user.save()   #3
        
        return user #4
    

  #SI NECESITA CONTRASEÑA
    def create_superuser(self, email, password, **extra_fields):
        user = self.create_user(email, password, **extra_fields) #USAMOS LA ANTERIOR FUNCTION CREATUSER

        user.is_staff = True #INDICARQUE SI PERTENECE AL STAFF
        user.is_superuser = True #INDICARQUE SI ES SUPERUSUAR
       
        user.save()

        return user


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField('Correo Electrónico',max_length = 255, unique = True,)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    is_editor = models.BooleanField(default=False)

    objects = UserManager()

    #DECIMOS A DJANGO QUE QUERMOS HACER LOGIN CON EMAIL
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    def __str__(self):
        return self.email
    
    def tokens(self):
        refresh = RefreshToken.for_user(self)
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token)
        }


   
