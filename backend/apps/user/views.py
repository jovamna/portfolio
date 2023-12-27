from django.shortcuts import render
from apps.user.serializers import *

from rest_framework import generics, authentication, permissions
from apps.user.models import User


from django.contrib.auth import authenticate, login, logout, get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated

from rest_framework.exceptions import PermissionDenied

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.urls import reverse

from django.db import connection

from rest_framework.exceptions import ValidationError
from datetime import datetime
from django.http import JsonResponse, HttpResponse

from datetime import timedelta
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken, Token
from django.template.loader import render_to_string
from rest_framework_simplejwt.exceptions import TokenError, AuthenticationFailed
from django.conf import settings
import  jwt
from django.shortcuts import redirect



from django.core.mail import send_mail
from pathlib import Path
import os
BASE_DIR = Path(__file__).resolve().parent.parent





User = get_user_model()



class UsersListView(APIView):
    
    def get(self, request, format=None):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)
    



class CreateUserView(generics.CreateAPIView):
    """Crear nuevo usuario en el sistema"""
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        try:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        except ValidationError as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def perform_create(self, serializer):
        serializer.save()









class LoginView(APIView):
    def post(self, request):
        if 'email' not in request.data or 'password' not in request.data:
            return Response({'msg': 'Credentials missing'}, status=status.HTTP_400_BAD_REQUEST)

        email = request.data['email']
        password = request.data['password']

        user = authenticate(request, email=email, password=password)

        if user is not None:
            login(request, user)

            refresh = RefreshToken.for_user(user)
            refresh.access_token.set_exp(lifetime=timedelta(minutes=700))  # Establecer vida útil del token de acceso
            access_token = str(refresh.access_token)
            refresh_token = str(refresh)

            return Response({'msg': 'Login Success', 'access_token': access_token, 'refresh_token': refresh_token}, status=status.HTTP_200_OK)

        return Response({'msg': 'Invalid Credentials'}, status=status.HTTP_401_UNAUTHORIZED)





   
        



class LogoutView(APIView):
    permission_classes = (IsAuthenticated,)
    
    def post(self, request):
        logout(request)
        return Response({'msg': 'Successfully Logged out'}, status=status.HTTP_200_OK)
    




import traceback


class PasswordResetView(generics.GenericAPIView):
    serializer_class = PasswordResetSerializer


    def get(self, request, *args, **kwargs):
        return render(request, 'passwordResetForm.html')


    def post(self, request,  *args, **kwargs):
        data = {}  # Definir data fuera de los bloques try/except
        if 'email' not in request.data:
            print("Email missing in request data")
            return Response({'msg': 'Please provide an email address in the request body.'}, status=status.HTTP_400_BAD_REQUEST)
        email = request.data['email']
        print(f"Received email: {email}")
        
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            print(f"Validated email: {email}")
            
            try:
                user = User.objects.get(email=email)
                token = RefreshToken.for_user(user).access_token
                print(token)
                #reset_url = reverse('set-password') + f'?token={str(token)}'
                #reset_url = "api/user/set-password/?token=" + str(token)
                #reset_url = "api/user/set-password/?token=" + str(token)
                reset_url = "http://127.0.0.1:8000/api/user/set-password/?token=" + str(token).replace(" ", "")
                print(reset_url)

                data_to_pass = {
                    'reset_url': reset_url,
                    'other_data': '...otros datos...',
                }
                #Serializar los datos
                serializer = self.get_serializer({
                    'email': email,
                    'reset_url': reset_url,
                    })
                print(serializer)
                
                template_path = os.path.join(os.path.dirname(os.path.dirname(BASE_DIR)), 'backend',  'templates', 'emails', 'forgotPassword.html')
                # Renderiza la plantilla utilizando la ruta construida
                #html_content = render_to_string(template_path, {'serializer': serializer.data})
                html_content = render_to_string(template_path, data_to_pass)

                print(html_content)

                try:
                    email_msg = send_mail(
                        subject='Password Reset',
                        message='',
                        from_email="jocoderina@gmail.com",
                        recipient_list=[user.email],
                        html_message=html_content,
                    )
                    print("Email Sent.")
                    data = {'status': status.HTTP_200_OK, 'msg': 'Email Sent.'}

                    #mensaje de exito enviado en plantilla NONFUNCIONA
                    #data['success'] =True


                    
                     # Si el correo se envió con éxito, redirige al usuario a la URL de React
                    #redirect_url = "http://localhost:5173/blog"  # Cambia esta URL a la correcta
                    redirect_url = "http://localhost:5173/blog?success=true"
                    html_response = f'''
                    <html>
                    <head>
                    <script>
                        window.location.href = "{redirect_url}";
                     </script>
                    </head>
                    <body>
                     Redireccionando...
                    </body>
                    </html>
                      '''
                    return HttpResponse(html_response)


                except Exception as e:
                   print(f"An error occurred while sending the email: {e}")
                   traceback.print_exc()
                   print(email_msg)


            except User.DoesNotExist:
                print("User not found")
                 # Puedes usar HttpResponseRedirect o redirect, dependiendo de tu preferencia
                #return HttpResponseRedirect("/ruta/a/tu/pagina.html")
                # O
                return redirect("http://localhost:5173/blog")
                #data = {'status': status.HTTP_404_NOT_FOUND, 'msg': 'User not found.'}


            except Exception as e:
              print(f"An unexpected error occurred: {e}")
              data = {'status': status.HTTP_500_INTERNAL_SERVER_ERROR, 'msg': 'An unexpected error occurred.'}
        else:
            print("Invalid data.")
            data = {'status': status.HTTP_400_BAD_REQUEST, 'msg': 'Invalid data.'}
            print(data)
        return Response(data)
    





#este es otro que no use pip install jwt import jwt
#decodificador pip install pyjwt   import jwt
class SetPasswordView(generics.RetrieveAPIView):
    serializer_class = SetPasswordSerializer  

    def get(self, request):
        template_path = os.path.join(os.path.dirname(os.path.dirname(BASE_DIR)), 'backend', 'templates', 'emails', 'setPassword.html')
        # Renderiza la plantilla HTML para el formulario de cambio de contraseña
        return render(request, template_path)

    def post(self, request):
        token = request.query_params.get('token')
        print(f"Received token: {token}")
        
        try:
            if not token:
              return Response({'message': 'Token is missing'}, status=status.HTTP_400_BAD_REQUEST)
        
        
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms='HS256')
            print(payload)
            user = User.objects.get(id=payload['user_id'])
            print(user)

            #ESTABLECE LA NUEVA CONTRASEÑA DIRECTAMENTE
            new_password = request.data.get('new_password')
            user.set_password(new_password)
            user.save()
        
            redirect_url = "http://localhost:5173/blog"  # Cambia esta URL a la correcta
            return redirect(redirect_url)
        except Exception as e:
          # Maneja la excepción aquí, puedes registrarla o tomar otras acciones necesarias
         error_message = f"An error occurred: {e}"
        return HttpResponse(error_message, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

     



      
class ChangePasswordView(APIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = PasswordChangeSerializer

    def post(self, request):
        user = request.user

        serializer = PasswordChangeSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        if not user.check_password(serializer.validated_data['current_password']):
            return Response({'error': 'Current password is incorrect.'}, status=status.HTTP_400_BAD_REQUEST)

        user.set_password(serializer.validated_data['new_password'])
        user.save()

        return Response({'message': 'Password changed successfully.'}, status=status.HTTP_200_OK)






class MaliciousEmailException(Exception):
    def __init__(self):
        self.message = "Dirección de correo electrónico maliciosa no permitida."
        super().__init__(self.message)

class AnotherGetAuthenticatedUserView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, format=None):
        user = request.user
        serialized_user = UserSerializer(user)

        try:
            self.check_email(user.email)
        except MaliciousEmailException as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)

        return Response(serialized_user.data, status=status.HTTP_200_OK)

    def check_email(self, email):
        if 'malicious' in email:
            raise MaliciousEmailException()
        




    


class GetAuthenticatedUserView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, format=None):
        user = request.user
        serialized_user = UserSerializer(user)

        # Verificar si el usuario está autenticado
        # Agregar una impresión para verificar el flujo
        print("Solicitud para obtener usuario autenticado recibida.")

        # Verificar si el usuario está autenticado
        if not request.user.is_authenticated:
            print("El usuario no está autenticado.")
            raise AuthenticationFailed('Token de acceso inválido o vencido.')

            #return Response({'detail': 'Token de acceso inválido o vencido.'}, status=status.HTTP_401_UNAUTHORIZED)

        return Response(serialized_user.data, status=status.HTTP_200_OK)







class OtherUserInfoView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, user_id, format=None):
        user = request.user

        # Verificar si el usuario que realiza la solicitud es el mismo que se está consultando
        if str(user.id) != user_id:
            raise PermissionDenied("No tienes permiso para acceder a esta información de usuario.")

        serialized_user = UserSerializer(user)  # Reemplaza esto con tu serializador de usuario
        return Response(serialized_user.data, status=status.HTTP_200_OK)
    


#se utiliza en las pruebas para simular y verificar cómo se manejan 
# las inyecciones SQL en los parámetros de consulta de una URL. 
# No está destinada a ser una parte funcional de la aplicación en 
# producción, sino más bien una herramienta para evaluar la 
# seguridad de la aplicación
class TestSQLInjectionView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, format=None):
        email = request.query_params.get('email', '')

        # Realizar alguna operación en función del parámetro de consulta (por ejemplo, buscar en una base de datos)
        # En este caso, simplemente verificamos si el parámetro de consulta contiene "malicious"
        if 'malicious' in email:
            return Response({'detail': 'Dirección de correo electrónico maliciosa no permitida.'}, status=status.HTTP_400_BAD_REQUEST)

        return Response({'detail': 'Operación exitosa.'}, status=status.HTTP_200_OK)









