from rest_framework.generics import CreateAPIView,RetrieveUpdateAPIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAdminUser
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from .models import EditorInChief
from .serializers import *
from django.conf import settings
# views.py
from rest_framework.permissions import IsAuthenticated
# Editor_Chief/views.py
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAdminUser
from .models import EditorInChief
from .serializers import EditorInChiefListSerializer  # You'll need to create this
# views.py
from rest_framework.generics import RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied

class EditorInChiefRegistrationView(CreateAPIView): #end point to registration
    serializer_class = EditorInChiefRegistrationSerializer

    def perform_create(self, serializer):
        instance = serializer.save()
        if settings.DEBUG:
            print(f"New EIC registered: {instance.user.email}")

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        return Response(
            {
                "message": "Registration successful. Pending admin approval.",
                "is_approved": False
            },
            status=status.HTTP_201_CREATED
        )

class ApproveEditorInChiefView(APIView): #end point to approve the editor in chief
    permission_classes = [IsAdminUser]
    
    def post(self, request, eic_id):
        try:
            eic = EditorInChief.objects.get(id=eic_id)
        except EditorInChief.DoesNotExist:
            return Response({"error": "Editor-in-Chief not found"}, status=status.HTTP_404_NOT_FOUND)
        
        if eic.is_approved:
            return Response({"message": "Already approved"}, status=status.HTTP_200_OK)
        
        eic.is_approved = True
        eic.save()
        
        if settings.DEBUG:
            print(f"EIC approved: {eic.user.email}")
        
        return Response({"message": "Approved successfully"}, status=status.HTTP_200_OK)

'''class EditorInChiefLoginView(APIView): #end point to login
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        if not email or not password:
            return Response(
                {'error': 'Both email and password are required'},
                status=status.HTTP_400_BAD_REQUEST
            )

        user = authenticate(username=email, password=password)
        if not user:
            return Response(
                {'error': 'Invalid credentials'},
                status=status.HTTP_401_UNAUTHORIZED
            )

        try:
            editor_in_chief = EditorInChief.objects.get(user=user)
            "if not editor_in_chief.is_approved:
                return Response(
                    {'error': 'Account pending approval', 'is_approved': False},
                    status=status.HTTP_403_FORBIDDEN
                )
            if not editor_in_chief.is_active:
                return Response(
                    {'error': 'Account deactivated'},
                    status=status.HTTP_403_FORBIDDEN
                )
        except EditorInChief.DoesNotExist:
            return Response(
                {'error': 'No Editor-in-Chief account found'},
                status=status.HTTP_403_FORBIDDEN
            )

        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.id,
            'eic_id': editor_in_chief.id,
            'email': user.email,
            'full_name': user.get_full_name(),
            'is_approved': editor_in_chief.is_approved,
            'profile_picture': request.build_absolute_uri(
                editor_in_chief.profile_picture.url
            ) if editor_in_chief.profile_picture else None
        }, status=status.HTTP_200_OK)'''

from rest_framework_simplejwt.views import TokenObtainPairView

class EditorInChiefLoginView(TokenObtainPairView):
    serializer_class = EditorInChiefTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        # Ensure email and password are provided
        if 'email' not in request.data or 'password' not in request.data:
            return Response(
                {'error': 'Both email and password are required'},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            # Create a copy of the request data
            data = request.data.copy()
            data['username'] = data['email']  # Map email to username field
            
            # Set the request in the serializer context for URL building
            serializer = self.get_serializer(data=data, context={'request': request})
            serializer.is_valid(raise_exception=True)
            
            return Response(serializer.validated_data, status=status.HTTP_200_OK)
            
        except serializers.ValidationError as e:
            return Response(
                {'error': str(e.detail)},
                status=status.HTTP_400_BAD_REQUEST
            )
        except Exception as e:
            return Response(
                {'error': 'Login failed. Please try again.'},
                status=status.HTTP_400_BAD_REQUEST
            )

class EditorInChiefListView(ListAPIView): #end point to get all the editor in chief details
    """
    View to list all Editor-in-Chief profiles
    Accessible only by admin users
    """
    serializer_class = EditorInChiefListSerializer
    #permission_classes = [IsAdminUser]
    queryset = EditorInChief.objects.all().select_related('user')
    
    def get_queryset(self):
        queryset = super().get_queryset()
        
        # Optional filtering by approval status
        is_approved = self.request.query_params.get('is_approved')
        if is_approved in ['true', 'false']:
            queryset = queryset.filter(is_approved=is_approved.lower() == 'true')
            
        return queryset

class EditorInChiefUpdateView(RetrieveUpdateAPIView): #end point to update a particular chief editor
    serializer_class = EditorInChiefUpdateSerializer
    #permission_classes = [IsAuthenticated]
    queryset = EditorInChief.objects.all()
    lookup_field = 'id'  # This tells DRF to look for 'id' in URL
    
    def get_object(self):
        # Get the EIC object from URL parameter
        eic = super().get_object()
        
        # Check if the requesting user is either:
        # 1. The EIC themselves OR
        # 2. An admin user
        '''if not (self.request.user == eic.user or self.request.user.is_staff):
            raise PermissionDenied("You don't have permission to edit this profile")'''
            
        return eic

    def perform_update(self, serializer):
        instance = serializer.save()
        if settings.DEBUG:
            print(f"EIC profile updated: {instance.user.email}")
 
class EditorInChiefDetailView(RetrieveAPIView): #end point to get all the details of a particular chief editor
    """
    Public endpoint to view any Editor-in-Chief's details
    No authentication or permission required
    """
    serializer_class = EditorInChiefDetailSerializer
    queryset = EditorInChief.objects.all().select_related('user')
    lookup_field = 'id'

from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated

class ValidateEditorInChiefTokenView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            user = request.user
            editor_in_chief = EditorInChief.objects.get(user=user)
            
            # Build profile picture URL if exists
            profile_picture = None
            if editor_in_chief.profile_picture and hasattr(editor_in_chief.profile_picture, 'url'):
                profile_picture = request.build_absolute_uri(editor_in_chief.profile_picture.url)
            
            return Response({
                'token': str(request.auth),
                'user_id': user.id,
                'eic_id': editor_in_chief.id,
                'email': user.email,
                'full_name': user.get_full_name(),
                'is_approved': editor_in_chief.is_approved,
                'profile_picture': profile_picture,
                # Include any additional fields
                'institution': editor_in_chief.institution,
                'position_title': editor_in_chief.position_title,
                'country': editor_in_chief.country
            }, status=status.HTTP_200_OK)
            
        except EditorInChief.DoesNotExist:
            return Response(
                {'error': 'No active Editor-in-Chief account found'},
                status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )