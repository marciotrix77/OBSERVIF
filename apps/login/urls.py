from django.urls import path
from login import views

app_name = 'login'

urlpatterns = [
    path('', views.login_view, name='login_SisGECC'), # Aponta a URL raiz para login_view
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),  # Adiciona a rota para logout    
]