from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout # Importar a função logout
from django.contrib.auth.decorators import login_required  # Importe o decorator
from login.forms import LoginForm


def login_view(request):
    if request.user.is_authenticated:
        return redirect('painel:painel')  # Redireciona para a página index se já estiver autenticado
    
    if request.method == 'POST':
        form = LoginForm(request, data=request.POST) # Use o formulário personalizado
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)
                return redirect('painel:painel') # Redireciona para a página index
            else:
                form.add_error(None, "Usuário ou senha incorretos.")
    else:
        form = LoginForm() # Use o formulário personalizado
    return render(request, 'login/pages/login.html', {'form': form})

def logout_view(request):
    logout(request) # Desloga o usuário
    return redirect('login:login_SisGECC')  # Redireciona para a página de login

