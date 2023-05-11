from rest_framework import serializers
from .models import User
from django.contrib.auth.hashers import make_password
import datetime
from django.http import JsonResponse , HttpResponse

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = [
            'first_name', 'last_name', 'username',  'email','hospital_name',
            'PhoneNumber', 'password'
        ]
        extra_kwargs = {'password': {'write_only': True}}
        

    def create(self, validated_data):

        # validated_data['activation_token_expiry'] = datetime.datetime.now() + datetime.timedelta(minutes=1)
        email = validated_data.get('email')
        # activation_token_expiry = datetime.datetime.now() + datetime.timedelta(minutes=1)
        # expired_user = User.objects.filter(
        #     email=email,
        #     is_active=False,
        #     # activation_token_expiry__lt=datetime.datetime.now()
        # ).first()
        # if expired_user:
        #     expired_user.delete()
        validated_data['password'] = make_password(validated_data.get('password'))
        # validated_data['activation_token_expiry'] = activation_token_expiry
        if User.objects.filter(email=email):
            return JsonResponse(
            {'detail': 'User does already exist.'}, status=400)
        return super().create(validated_data)

    def update(self, instance, validated_data):
        validated_data['password'] = make_password(validated_data.get('password', instance.password))
        return super().update(instance, validated_data)

    

class UserListSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = [
            'UserID', 'First name', 'Last name', 'Username', 'email','hospital_name'
            'PhoneNumber'
        ]

class UserProfileSerializer(serializers.ModelSerializer):
    Img = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
             'first_name', 'last_name', 'username', 'email',
            'PhoneNumber', 'UserID', 'Img', 'hospital_name'
        ]
    def get_Img(self, User):
        request = self.context.get('request')
        Img = User.Img.url
        return request.build_absolute_uri(Img)