from django.contrib import admin
from .models import Dashboard

@admin.register(Dashboard)
class DashboardAdmin(admin.ModelAdmin):
    list_display = ('nome', 'data_atualizacao')
    search_fields = ('nome', 'descricao')
