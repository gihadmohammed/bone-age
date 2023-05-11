# from django.urls import path
# from . import views
# urlpatterns = [
#     # path('register/', views.UserRegisterView.as_view() ,name = 'Register')
#     path('register/', views.register, name='register')

# ]

from django.urls import path
from .views import UserRegisterView
from .views import UserListView
from . import views
from .views import ActivateAccountView



urlpatterns = [
    path('register/', UserRegisterView.as_view(), name='user_register'),
    path('users/', UserListView.as_view(), name='user-list'),
    path('login/', views.login_view, name='api-login'),
    path('logout/', views.logout_view, name='api-logout'),
    path('session/', views.session_view, name='api-session'),
    path('whoami/', views.whoami_view, name='api-whoami'),
    path('activate/<str:activation_token>/', ActivateAccountView.as_view(), name='activate_account'),
    path('forgot-password/', views.forgot_password, name='forgot_password'),
    path('reset-password/<str:uidb64>/<str:token>/', views.ResetPassword.as_view(), name='reset_password'),
    path('api/edit_profile/', views.edit_profile, name='edit_profile'),
    path('verify_email/', views.verify_email, name='verify_email'),
    path('get_profile/', views.get_profile, name='get_profile'),
    path('change-password/', views.change_password, name='changepas'),
    path('add-patient/', views.add_patient, name='add_patient'),

]
