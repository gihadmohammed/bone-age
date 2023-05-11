
from django.db import models
from datetime import datetime
from django_mysql.models import ListCharField
from django.contrib.auth.models import AbstractUser
from django.core.exceptions import ValidationError
import secrets
from django.core.mail import send_mail
from django.urls import reverse
from datetime import timedelta
from django.utils import timezone
# from .models import User,Patient


Gender = [
    ("FEMALE", "Female"),
    ("MALE", "Male"),
]

from django.contrib.auth.models import AbstractUser
from django.db import models
import logging
logger = logging.getLogger(__name__)


from django.contrib.auth.models import UserManager

class CustomUserManager(UserManager):
    def create_user(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_superuser', False)
        extra_fields.setdefault('is_active', False)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        # user.activation_token = secrets.token_urlsafe(32)

        # user.activation_token_expiry = timezone.now() + timedelta(minutes=1)
        user.save(using=self._db)
        user.send_activation_email()
        return user
    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_active', True)
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

class User(AbstractUser):
    UserID = models.AutoField(null=False, blank=False, primary_key=True)
    email = models.EmailField(null=False, blank=False, unique=True)
    email_verification_code = models.CharField(max_length=50, null=True, blank=True)
    email_verification_timestamp = models.DateTimeField(null=True, blank=True)
    new_email = models.EmailField(null=True, blank=True)
    Img = models.ImageField(upload_to='images/', null=True, blank=True)
    PhoneNumber = models.CharField(null=False,
                                   blank=False,
                                   max_length=11,
                                   default='01001234567')
    hospital_name = models.CharField(null=True, blank=True, max_length=50)
    # Address = models.CharField(null=True, blank=True, max_length=150)
    is_active= models.BooleanField(default=False)
    # activation_token = models.CharField(max_length=255, null=True, blank=True)
    # activation_token_expiry = models.DateTimeField(null=True, blank=True)
    password_reset_used =  models.BooleanField(default=False)

    objects = CustomUserManager()

    def clean(self):
        # Check if phone number is valid
        super().clean()
        if self.PhoneNumber:
            if not self.PhoneNumber.isdigit():
                raise ValidationError('Phone number should only contain digits.')
            if len(self.PhoneNumber) != 11:
                raise ValidationError('Phone number should be exactly 11 digits long.')
            if not self.PhoneNumber.startswith('01'):
                raise ValidationError('Phone number should start with 01.')
        if User.objects.filter(username=self.username).exclude(UserID=self.UserID).exists():
            raise ValidationError('Username already exists.')
        # elif self.Role != 'VENDOR' and self.DisplayName:
        #     self.DisplayName = None
    def save(self, *args, **kwargs):
        # if not self.activation_token:
        #     self.activation_token = secrets.token_urlsafe(32)
            
        super().save(*args, **kwargs)


def send_activation_email(self):
        subject = 'Activate your account'
        message = message = f'Hi {self.username},\n\nPlease click the following link to activate your account (valid for 24 hours):\n\n{self.get_activation_url()}\n\nThanks!'
        from_email = 'noreply@example.com'
        recipient_list = [self.email]
        try:
            send_mail(subject, message, from_email, recipient_list, fail_silently=False)
        except Exception as e:
            logger.error(f'Failed to send activation email: {e}')
        else:
            logger.info('Activation email sent successfully')


def is_activation_token_valid(self):
        # Check if the activation token is valid and not expired
        return self.activation_token_expiry is not None and timezone.now() < self.activation_token_expiry

def get_activation_url(self):
        return f'http://example.com/activate/{self.activation_token}/'



class Patient(models.Model):
    PatientID = models.AutoField(null=False, blank=False, primary_key=True)
    first_name = models.CharField(null=True, blank=True, max_length=50)
    last_name = models.CharField(null=True, blank=True, max_length=50)
    DoctorID = models.ForeignKey(User,null = False, blank = False, on_delete=models.CASCADE)
    c_age= models.CharField(null=True, blank=True, max_length=3)
    Gender = models.CharField(max_length=20,
                            choices=Gender,
                            null=False,
                            blank=False,
                            default=Gender[0][0])
    Weight= models.CharField(null=True, blank=True, max_length=39);
    Height= models.CharField(null=True, blank=True, max_length=39);


class X_ray(models.Model):
       PatientID = models.ForeignKey(Patient,null = False, blank = False, on_delete=models.CASCADE)
       Img = models.ImageField(upload_to='images/', null=True, blank=True)
       Bone_age = models.CharField(null=False, blank=False, max_length=50)
       Diagnosis = models.CharField(null=True, blank=True, max_length=50)
       Notes = models.CharField(null=True, blank=True, max_length=50)
       Date = models.DateField(default=timezone.now())

  

        





# class Guest(models.Model):
#     GuestID = models.IntegerField(null=False,
#                                   blank=False,
#                                   primary_key=True,
#                                   unique=True,
#                                   default=50)
#     CreatedDate = models.DateField(null=False,
#                                    blank=False,
#                                    default=datetime.now(),
#                                    editable=False)
#     ModifiedDate = models.DateField(null=True)
#     IsArchived = models.BooleanField(null=False, blank=False, default=False)



