from django.urls import path
from .views import (
    EditorInChiefRegistrationView,
    EditorInChiefLoginView,
    ApproveEditorInChiefView,
    EditorInChiefUpdateView,
    EditorInChiefListView,
    EditorInChiefDetailView,
    ValidateEditorInChiefTokenView
)

urlpatterns = [
    path('signup/', EditorInChiefRegistrationView.as_view(), name='eic-signup'), #end point for sign up
    path('login/', EditorInChiefLoginView.as_view(), name='eic-login'), #end point for login
    path('approve/<int:eic_id>/', ApproveEditorInChiefView.as_view(), name='eic-approve'), #end point to approve the editor in chief
    # ... other URLs
    path('update/<int:id>/', EditorInChiefUpdateView.as_view(), name='eic-update'),
    path('list/', EditorInChiefListView.as_view(), name='eic-list'),
    path('get-profile/<int:id>/', EditorInChiefDetailView.as_view(), name='eic-detail'),
    path('validate-token/', ValidateEditorInChiefTokenView.as_view(), name='validate_eic_token'),
]