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
python [manage.py](http://_vscodecontentref_/1) makemigrations
python [manage.py](http://_vscodecontentref_/2) migrate

# 8. Configure os arquivos estáticos
python [manage.py](http://_vscodecontentref_/3) collectstatic

# 9. Teste o servidor localmente
python [manage.py](http://_vscodecontentref_/4) runserver
