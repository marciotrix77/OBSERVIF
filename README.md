# Observatório de Indicadores do IF Baiano

Este é um sistema desenvolvido em Django para gerenciar e visualizar indicadores do IF Baiano.

---

## **Guia de Implantação**

### **1. Pré-requisitos**
Antes de começar, certifique-se de que o servidor possui os seguintes softwares instalados:
- Python 3.x
- `pip` (gerenciador de pacotes do Python)
- Banco de dados (PostgreSQL ou MySQL)
- Servidor web (Nginx ou Apache)
- `virtualenv` (para criar ambientes virtuais)

---

### **2. Passos para Implantação**

Execute os seguintes comandos no servidor para configurar o ambiente e implantar o sistema:

```bash
# 1. Atualize o sistema e instale dependências básicas
sudo apt update
sudo apt install python3 python3-pip python3-venv nginx postgresql postgresql-contrib

# 2. Clone o repositório do projeto
git clone <URL_DO_SEU_REPOSITORIO>
cd <PASTA_DO_PROJETO>

# 3. Crie e ative um ambiente virtual
python3 -m venv venv
source venv/bin/activate

# 4. Instale as dependências do projeto
pip install -r requirements.txt

# 5. Configure o banco de dados PostgreSQL
sudo -u postgres psql
CREATE DATABASE observatorio;
CREATE USER observatorio_user WITH PASSWORD 'sua_senha';
GRANT ALL PRIVILEGES ON DATABASE observatorio TO observatorio_user;
\q

# 6. Atualize o arquivo settings.py com as configurações do banco de dados
# (Edite o arquivo settings.py e configure o banco de dados conforme abaixo)
# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.postgresql',
#         'NAME': 'observatorio',
#         'USER': 'observatorio_user',
#         'PASSWORD': 'sua_senha',
#         'HOST': 'localhost',
#         'PORT': '5432',
#     }
# }

# 7. Aplique as migrações do banco de dados
python manage.py makemigrations
python manage.py migrate

# 8. Configure os arquivos estáticos
python manage.py collectstatic

# 9. Teste o servidor localmente
python manage.py runserver
```

---

### **3. Configuração de Produção**

Execute os seguintes passos para configurar o ambiente de produção:

```bash
# 1. Instale o Gunicorn
pip install gunicorn

# 2. Teste o Gunicorn
gunicorn --bind 0.0.0.0:8000 observatorio.wsgi:application

# 3. Configure o Nginx
sudo nano /etc/nginx/sites-available/observatorio

# Adicione o seguinte conteúdo ao arquivo:
# server {
#     listen 80;
#     server_name seu_dominio.com www.seu_dominio.com;
#
#     location = /favicon.ico { access_log off; log_not_found off; }
#     location /static/ {
#         root /caminho/para/seu/projeto;
#     }
#
#     location / {
#         include proxy_params;
#         proxy_pass http://127.0.0.1:8000;
#     }
# }

# 4. Ative a configuração do Nginx
sudo ln -s /etc/nginx/sites-available/observatorio /etc/nginx/sites-enabled
sudo nginx -t
sudo systemctl restart nginx

# 5. Configure o Gunicorn como um serviço
sudo nano /etc/systemd/system/observatorio.service

# Adicione o seguinte conteúdo ao arquivo:
# [Unit]
# Description=gunicorn daemon for Observatorio
# After=network.target
#
# [Service]
# User=seu_usuario
# Group=www-data
# WorkingDirectory=/caminho/para/seu/projeto
# ExecStart=/caminho/para/seu/projeto/venv/bin/gunicorn --workers 3 --bind unix:/caminho/para/seu/projeto/observatorio.sock observatorio.wsgi:application
#
# [Install]
# WantedBy=multi-user.target

# 6. Inicie e habilite o serviço do Gunicorn
sudo systemctl start observatorio
sudo systemctl enable observatorio
```

---

### **4. Configuração de HTTPS**

Configure HTTPS para o seu domínio usando o Let's Encrypt:

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d seu_dominio.com -d www.seu_dominio.com
```

---

### **5. Testando o Projeto**

Acesse o domínio ou IP do servidor para verificar se o projeto está funcionando. Use os seguintes comandos para verificar logs em caso de problemas:

```bash
# Verifique os logs do Gunicorn
sudo journalctl -u observatorio

# Verifique os logs do Nginx
sudo tail -f /var/log/nginx/error.log
```

---

### **6. Segurança Adicional**

Configure o firewall para permitir apenas as portas necessárias:

```bash
sudo ufw allow 'Nginx Full'
sudo ufw enable
```


