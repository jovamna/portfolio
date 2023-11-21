from django.urls import path
from apps.user import views
from .views import *
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)



app_name = 'user'

urlpatterns = [
    path('users' ,UsersListView.as_view()),
    path('me/', views.GetAuthenticatedUserView.as_view(), name='user-info'),
    path('user-info/<int:user_id>/', views.OtherUserInfoView.as_view(), name='other-user-info'),
    path('create/', views.CreateUserView.as_view(), name='user-registration'),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('login/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('reset-password/', PasswordResetView.as_view(), name='reset-password'),
    path('set-password/', SetPasswordView.as_view(), name='set-password'), #este va con token que el codigo de reset-password lo proporiciona
    path('change-password/', ChangePasswordView.as_view(), name='change-password'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('test-sql-injection/', TestSQLInjectionView.as_view(), name='test-sql-injection'),
   
    #path('api-token-auth/', obtain_auth_token, name='api_token_auth'),
    #path('token/', views.CreateTokenView.as_view(), name='token'),
    #path('login', views.LoginView.as_view(), name='login'),
   

    
]
