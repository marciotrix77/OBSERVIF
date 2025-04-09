from django.shortcuts import render, get_object_or_404
from django.contrib.auth.decorators import login_required  # Importe o decorator
from .models import Dashboard  # Importe o modelo Dashboard


# Create your views here.

@login_required
def painel(request):
    dashboards = Dashboard.objects.all()  # Obtém todos os dashboards do banco de dados
    return render(request, 'painel/pages/painel.html', {'dashboards': dashboards})

@login_required
def dashboard(request, id):
    dashboard = get_object_or_404(Dashboard, id=id)  # Valida o ID e retorna 404 se não encontrado
    return render(request, 'painel/partials/dashboard.html', {'dashboard': dashboard})



