from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User

class CustomUserCreationForm(UserCreationForm):
    FirstName = forms.CharField(max_length=20, required=True)
    LastName = forms.CharField(max_length=20, required=True)
    Address = forms.CharField(max_length=150, required=True)
    PromoCodeUsed = forms.CharField(max_length=100, required=False)
    DisplayName = forms.CharField(max_length=50, required=False)
    PhoneNumber = forms.CharField(max_length=20, required=True)

    class Meta:
        model = User
        fields = ['username', 'FirstName', 'LastName', 'Address', 'PromoCodeUsed', 'DisplayName', 'email', 'PhoneNumber', 'password1', 'password2']
