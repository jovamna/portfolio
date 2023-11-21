from django.contrib.auth import get_user_model, authenticate
from django.utils.translation import gettext_lazy as _
from rest_framework import serializers
from apps.user.models  import User
from django.utils.translation import gettext as _



#para crear usuarios
class UserSerializer(serializers.ModelSerializer):
    """Serializer para el objeto de usuarios"""
    last_name= serializers.CharField(required=False)
    
    class Meta:
        model = get_user_model()
        fields = ('email', 'password', 'first_name', 'last_name')
        extra_kwargs= {'password':{'write_only':True, 'min_length': 5}}


    # Agrega una validación personalizada para hacer 'last_name' opcional
    def validate_last_name(self, value):
        # Si no se proporciona el apellido, devuelve una cadena vacía en su lugar
        return value if value is not None else ''
        
    def create(self, validated_data):
        """crear nuevo usuario con clave encriptada y retornarla"""
        return get_user_model().objects.create_user(**validated_data)
    
    def update(self, instance, validated_data):
        """actualizar el usuario certifica el password correctamente"""
        password = validated_data.pop('password', None)
        user = super().update(instance, validated_data)
        
        if password:
            user.set_password(password)
            user.save()
            
        return user
    
    def validate_email(self, value):
        if 'malicious' in value:
            raise serializers.ValidationError("Dirección de correo electrónico maliciosa no permitida.")
        return value

#if user is not None:
   #login(request, user)



class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(style={'input_type': 'password'}, trim_whitespace=False)

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')
        
        if email and password:
            user = authenticate(request=self.context.get('request'), email=email, password=password)
            if user:
                if not user.is_active:
                    msg = {
                        'status': False,
                        'detail': 'This user account is not active.'
                    }
                    raise serializers.ValidationError(msg, code='authorization')
                
                payload = jwt_payload_handler(user)
                token = jwt_encode_handler(payload)
                data['token'] = token
                data['user'] = user
            else:
                msg = {
                    'status': False,
                    'detail': 'Invalid credentials'
                }
                raise serializers.ValidationError(msg, code='authorization')
        else:
            msg = {
                'status': False,
                'detail': 'Email and password must be provided in the request'
            }
            raise serializers.ValidationError(msg, code='authorization')
        
        return data



class UserLogoutSerializer(serializers.Serializer):
    phone_number = serializers.CharField(max_length=11, required=True)

    def validate(self, attrs):
        phone_number = attrs.get('phone_number')
        user = User.objects.filter(phone_number=phone_number).exists()
        if user:
            return attrs
        else:
            msg = {
                'detail': 'User does not exists.', 'register': True}
            raise serializers.ValidationError(msg, code='authorization')



class PasswordChangeSerializer(serializers.Serializer):
    current_password = serializers.CharField(style={"input_type": "password"}, required=True)
    new_password = serializers.CharField(style={"input_type": "password"}, required=True)

    def validate_current_password(self, value):
        if not self.context['request'].user.check_password(value):
            raise serializers.ValidationError({'current_password': 'Does not match'})
        return value
    

    
class NOPasswordResetSerializer(serializers.Serializer):
    email = serializers.EmailField()  # Agrega el campo "email" al serializer
    new_password = serializers.CharField(max_length=128)
    password_confirm = serializers.CharField(max_length=128)

    def validate(self, data):
        """
        Valida que las contraseñas coincidan.
        """
        new_password = data.get('new_password')
        password_confirm = data.get('password_confirm')

        if new_password != password_confirm:
            raise serializers.ValidationError("Las contraseñas no coinciden.")

        return data
    
# Definir un serializador para el correo electrónico de restablecimiento de contraseña
class PasswordResetSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    


class SetPasswordSerializer(serializers.Serializer):
    new_password = serializers.CharField(write_only=True, required=True)
    confirm_password = serializers.CharField(write_only=True, required=True)

    def validate(self, data):
        """
        Valida que las contraseñas coincidan.
        """
        new_password = data.get('new_password')
        confirm_password = data.get(' confirm_password')

        if new_password !=  confirm_password:
            raise serializers.ValidationError("Las contraseñas no coinciden.")

        return data


