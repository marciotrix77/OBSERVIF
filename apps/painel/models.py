from django.db import models

# Create your models here.
class Dashboard(models.Model):
    nome = models.CharField(max_length=200, verbose_name="Nome")
    descricao = models.TextField(verbose_name="Descrição")
    fonte_dos_dados = models.TextField(verbose_name="Fonte dos Dados")
    utilizacao = models.TextField(verbose_name="Utilização")
    documentacao = models.FileField(upload_to='documentacao/',  null=True, blank=True, verbose_name="Documentação (PDF)")
    data_atualizacao = models.DateField(verbose_name="Data da Atualização")
    link = models.URLField(max_length=500, verbose_name="Link do Dashboard", null=True, blank=True)


    def __str__(self):
        return str(self.nome)
