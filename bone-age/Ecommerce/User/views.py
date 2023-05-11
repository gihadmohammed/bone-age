import json
import datetime
import pytz
from django.core.files.base import ContentFile

from django.conf import settings
from django.contrib.auth import authenticate, get_user_model, login, logout
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import send_mail
from django.db.models import Q
from django.http import JsonResponse, HttpResponse
from django.shortcuts import render, get_object_or_404, redirect
from django.urls import reverse_lazy
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie
from django.views.decorators.http import require_POST
from django.views import View
from django.contrib.auth import get_user_model
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_decode
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics, status, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics, permissions
from django.http import JsonResponse
from django.core.files.storage import default_storage
import uuid
from User.models import User
from User.serializers import UserProfileSerializer, UserSerializer
from django.core.mail import send_mail
from django.urls import reverse
from django.conf import settings
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.tokens import default_token_generator
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode
from rest_framework.authtoken.models import Token

from .models import User
from .serializers import UserSerializer, UserListSerializer
from django.shortcuts import render, redirect
from django.http import HttpResponse
from .models import Patient, X_ray
from django.utils import timezone

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_patient(request):

    patient_data = {
        'first_name': request.data.get('first_name'),
        'last_name': request.data.get('last_name'),
        'DoctorID': request.user,
        'c_age': request.data.get('c_age'),
        'Gender': request.data.get('Gender'),
        'Weight': request.data.get('Weight'),
        'Height': request.data.get('Height')
    }

    patient = Patient.objects.create(**patient_data)
    print("hereeeee")

    # if 'Img' in request.FILES:
        # if avatar == "http://127.0.0.1:8000"+ str(user.Img.url):
        #   image_path=user.Img.url
        # else:  
        # image_url = default_storage.url(image_path)
    xray_file = request.FILES.get('Img')


    xray_data = {
        'PatientID': patient,
        'Bone_age': request.data.get('Bone_age'),
        'Diagnosis': request.data.get('Diagnosis'),
        'Notes': request.data.get('Notes'),
        'Date': timezone.now(),
        'Img' : xray_file 
    }

    xray = X_ray.objects.create(**xray_data)
    
    return JsonResponse({'detail': 'Patient added successfully'})

class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserListSerializer

class ActivateAccountView(View):
    def get(self, request, activation_token):
        # user = get_object_or_404(User, activation_token=activation_token)
        # #localize the time
        # utc=pytz.UTC

        # if user.activation_token_expiry < utc.localize(datetime.datetime.now()):
        #     return HttpResponse("expired link and the registertion request is voided. Please register again")
        # else:

            # user.is_active = True
            user.save()
            return redirect('http://localhost:3000/') 


class UserRegisterView(generics.CreateAPIView):
    permission_classes=[AllowAny]
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):
        # Check if a user with the same email or username exists
        email = request.data.get('email')
        username = request.data.get('username')
        if User.objects.filter(Q(email=email) | Q(username=username),is_active=False ).exists():
            user = User.objects.get(Q(email=email) | Q(username=username))
            # Check if the activation token is expired
            utc=pytz.UTC
            # print(user.activation_token_expiry)
            print(utc.localize(datetime.datetime.now()))

            # if user.activation_token_expiry < utc.localize(datetime.datetime.now()):
                # Delete the previous user
                # user.delete()
            # else:
            #     return Response({
            #         "message": "User with this email or username already exists and the activation token is not expired. Please Verify your account"
            #     }, status=status.HTTP_400_BAD_REQUEST)

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        # Send email to the newly registered user
        # subject = 'Activate your account'
        # message = f'Hi {user.username}, please click on the following link to activate your account: {request.build_absolute_uri(reverse_lazy("activate_account", args=[user.activation_token]))}'
        # from_email = 'your-email@example.com' # Replace with your email address
        # recipient_list = [user.email]
        # send_mail(subject, message, from_email, recipient_list, fail_silently=False)

        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "message": "User has been created successfully",
        }, status=status.HTTP_201_CREATED)


@csrf_exempt
@require_POST
def login_view(request):
    data = json.loads(request.body)
    username = data.get('username')
    password = data.get('password')

    if username is None or password is None:
        return JsonResponse(
            {'detail': 'Please provide username and password.'}, status=401)
    if User.objects.filter(username=username).exists():
        CurrentUser=User.objects.filter(username=username)[0]
    else:
        return JsonResponse({'detail': "Username doesn't exist"}, status=404)

    user = authenticate(username=username, password=password)
    if(CurrentUser.is_active ==False):
        return JsonResponse({'detail': 'The account is not verified.'}, status=400)
    if user is None:
        return JsonResponse({'detail': 'Invalid credentials.'}, status=401)
    if user is not None:
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)
       
    login(request, user)
       

 
    return JsonResponse({'detail': 'Login successfully.','token': access_token})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_profile(request):   
    print(request.user)
    if request.user.Img:
          Img="http://127.0.0.1:8000"+ str(request.user.Img.url)
          profile= { 
          'username' : request.user.username,
          'first_name' : request.user.first_name,
          'last_name' : request.user.last_name,
          'email' : request.user.email,
          'PhoneNumber'  : request.user.PhoneNumber ,
        #   'Address'  : request.user.Address,
          'hospital_name' : request.user.hospital_name ,  
          'UserID' : request.user.UserID,
          'Img' :Img,
          
      }

    else :

       profile= {
        'username' : request.user.username,
        'first_name' : request.user.first_name,
        'last_name' : request.user.last_name,
        'email' : request.user.email,
        'PhoneNumber'  : request.user.PhoneNumber ,
        # 'Address'  : request.user.Address,
        'hospital_name' : request.user.hospital_name ,  
        'UserID' : request.user.UserID,
        # 'Img' : request.user.Img.url,
      }
    print(profile)
    return Response(profile) 

   

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def logout_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({'detail': 'You are not logged in.'}, status=400)

    logout(request)
    return JsonResponse({'detail': 'Successfully logged out.'})


@ensure_csrf_cookie
def session_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({'isAuthenticated': False})

    return JsonResponse({'isAuthenticated': True})


def whoami_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({'isAuthenticated': False})

    return JsonResponse({'username': request.user.username})


User = get_user_model()

@api_view(['POST'])
@permission_classes([])
def forgot_password(request):
    email = request.data.get('email')
    if not email:
        return Response({'error': 'Please provide an email address.'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response({'error': 'No user found with that email address.'}, status=status.HTTP_404_NOT_FOUND)

    if not user.is_active:
        return Response({'error': 'User account is inactive.'}, status=status.HTTP_403_FORBIDDEN)

    token = default_token_generator.make_token(user)
    uid = urlsafe_base64_encode(str(user.pk).encode())
    reset_url = f'{settings.FRONTEND_BASE_URL}/reset_password/{uid}/{token}/'
    send_password_reset_email(user.email, reset_url)

    return Response({'success': 'Password reset email sent.'}, status=status.HTTP_200_OK)

def send_password_reset_email(recipient_email, reset_url):
    subject = 'Reset your password'
    message = f'Hi,\n\nPlease click the link below to reset your password:\n\n{reset_url}'
    from_email = 'noreply@example.com'
    recipient_list = [recipient_email]
    send_mail(subject, message, from_email, recipient_list)

class ResetPassword(APIView):
    permission_classes=[AllowAny]

    def post(self, request, *args, **kwargs):
        uidb64 = kwargs.get('uidb64')
        token = kwargs.get('token') 
        
        try:
            uid = urlsafe_base64_decode(uidb64).decode()
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            return Response({'error': 'Invalid reset link.'}, status=status.HTTP_400_BAD_REQUEST)
        
        if user.password_reset_used:
           return Response({'error': 'Invalid reset link.'}, status=status.HTTP_400_BAD_REQUEST)

        if default_token_generator.check_token(user, token):
            password = request.data.get('password')
            if not password:
                return Response({'error': 'Please provide a new password.'}, status=status.HTTP_400_BAD_REQUEST)
            user.set_password(password)
            user.password_reset_used = True
            user.save()
            return Response({'success': 'Password has been reset.'}, status=status.HTTP_200_OK)

        return Response({'error': 'Invalid reset link.'}, status=status.HTTP_400_BAD_REQUEST)





@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def edit_profile(request):
    user = request.user

    if 'email' in request.data:
        email = request.data['email']
        if email != user.email:
            print(email)
            print(user.email)
            if User.objects.filter(email=email).exists():
                return Response({'message': 'Email already exists'}, status=400)
            else:
                verification_code = str(uuid.uuid4())
                user.new_email = email
                user.email_verification_code = default_token_generator.make_token(user)
                return Response({'message': 'verification code was sent'}, status=200)

                try:
                    token = Token.objects.get(user=user)
                except Token.DoesNotExist:
                    token = Token.objects.create(user=user)
                user.save()
                verification_url = request.build_absolute_uri(reverse('verify_email')) + f'?code={user.email_verification_code}&token={token.key}'
                subject = 'Verify your email address'
                message = f'Hi {user.username},\n\nPlease verify your email address by clicking the link below:\n\n{verification_url}\n\nThis link will expire in 1 hour.\n\nThanks!'
                from_email = settings.EMAIL_HOST_USER
                recipient_list = [user.new_email]
                send_mail(subject, message, from_email, recipient_list)     
                user.save()

    if 'username' in request.data:
        username = request.data['username']
        if username != user.username:
            if User.objects.filter(username=username).exists():
                return Response({'message': 'Username already exists'}, status=400)
            user.username = username
    # print(request.FILES['Img'])
    if 'Img' in request.FILES:
        avatar = request.FILES['Img']
        # if avatar == "http://127.0.0.1:8000"+ str(user.Img.url):
        #   image_path=user.Img.url
        # else:  
        image_path = default_storage.save('images/' + avatar.name, ContentFile(avatar.read()))
        # image_url = default_storage.url(image_path)
        user.Img = image_path

    user.first_name = request.data['first_name']
    user.last_name = request.data['last_name']  
    user.PhoneNumber = request.data['PhoneNumber']  
    # user.Address = request.data['Address']
    user.DisplayName = request.data['DisplayName']

    Img="http://127.0.0.1:8000"+ str(request.user.Img.url)
    user.save()
    print( request.user.DisplayName )
    profile= {
        'username' : request.user.username,
        'first_name' : request.user.first_name,
        'last_name' : request.user.last_name,
        'email' : request.user.email,
        'PhoneNumber'  : request.user.PhoneNumber ,
        'DisplayName' : request.user.DisplayName ,  
        'UserID' : request.user.UserID,
        'Role' : request.user.Role,
        'Img' : Img,
     }
    return JsonResponse({'user': profile})

def verify_email(request):
    verification_code = request.GET.get('code')
    token_key = request.GET.get('token')
    
    try:
        token = Token.objects.get(key=token_key)
        user = token.user
    except Token.DoesNotExist:
        pass
    
    if user.email_verification_code != verification_code:
        pass
    
    user.email = user.new_email
    user.new_email = ''
    user.email_verification_code = ''
    user.email_verification_timestamp = None
    user.save()
    
    # Redirect to a success page
    data = {'profile': {
        'username' : user.username,
        'first_name' : user.first_name,
        'last_name' : user.last_name,
        'email' : user.email,
        'PhoneNumber'  : user.PhoneNumber ,
        'DisplayName' : user.DisplayName ,  
        'UserID' : user.UserID,
        'Role' :user.Role,
    

    }}

    url = '/some-url/?{}'.format('&'.join(['{}={}'.format(k, v) for k, v in data.items()]))
    return redirect('http://localhost:3000/homepage')






from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response


from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.contrib.auth import authenticate

@csrf_exempt
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def change_password(request):
    if request.method == 'POST':
        old_password = request.data.get('old_password')
        new_password1 = request.data.get('new_password1')
        new_password2 = request.data.get('new_password2')
        
        # Authenticate the user with their current password
        user = request.user
        
        if user.check_password(old_password):
            # Update the user's password
            if new_password1 == new_password2:
                user.set_password(new_password1)
                user.save()
                # Log the user in with their new password
                return JsonResponse({'success': 'Your password was successfully updated!'}, status=200)
            else:
                return JsonResponse({'errors': {'new_password2': ['The two password fields didn\'t match.']}}, status=400)
        else:
            return JsonResponse({'errors': {'old_password': ['Your old password was entered incorrectly. Please enter it again.']}}, status=400)
    else:
        return JsonResponse({'errors': {'general': ['Invalid request method.']}}, status=400)

