from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from . import views

app_name = 'painel'

urlpatterns = [
    path('', views.painel, name='painel'),
    path('dashboard/<int:id>/', views.dashboard, name='dashboard'),
]  + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)