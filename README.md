# **OBSERVIF - Observatório de Indicadores Educacionais do IF Baiano**

O **OBSERVIF** é uma plataforma desenvolvida para consolidar e disponibilizar dados educacionais do Instituto Federal Baiano (IF Baiano) em dashboards interativos e intuitivos. A plataforma tem como objetivo fornecer uma visão abrangente e detalhada dos indicadores educacionais, permitindo análises estratégicas sobre matrículas, processos seletivos, evasão escolar e demanda por cursos.

## **Principais Funcionalidades**
- **Dashboards Interativos**: Visualize gráficos e relatórios dinâmicos sobre matrículas, inscrições no SISU, PROSEL e outros processos educacionais.
- **Dados Consolidados**: Acesse informações segmentadas por campus, curso, modalidade de ensino, cidade e outros critérios relevantes.
- **Fontes Confiáveis**: Os dados são extraídos diretamente de sistemas institucionais, como o SUAP, Censo da Educação Básica/Superior, SISU Gestão e OPINA.
- **Ferramenta de Tomada de Decisão**: Subsidie decisões estratégicas relacionadas à oferta de vagas, alocação de recursos e planejamento institucional.
- **Acessibilidade**: Interface amigável e responsiva, acessível tanto para gestores quanto para pesquisadores e demais interessados.

## **Impacto**
O OBSERVIF transforma dados brutos em insights acionáveis, contribuindo para:
- Melhoria na gestão educacional.
- Identificação de tendências e padrões no comportamento dos estudantes.
- Expansão e consolidação da oferta educacional do IF Baiano.

## **Tecnologias Utilizadas**
- **Backend**: Python com Django  
- **Frontend**: HTML, CSS, JavaScript (e bibliotecas como Chart.js ou Plotly para visualizações)  
- **Banco de Dados**: PostgreSQL (ou outro banco relacional)  
- **Deploy**: Nginx, Gunicorn, Docker (opcional)  

## **Como Contribuir**
Contribuições são bem-vindas! Se você deseja melhorar a plataforma, corrigir bugs ou adicionar novos recursos, consulte nossa [documentação](docs/) ou entre em contato com a equipe de desenvolvimento.

---

## **Links Úteis**
- [Repositório no GitHub](https://github.com/marciotrix77/OBSERVIF)
- [Plataforma Online](#) *(insira o link quando disponível)*

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

Para um sistema Django com até 40 acessos simultâneos no pico, os requisitos de hardware podem ser modestos, dependendo da complexidade do sistema, do banco de dados utilizado e do volume de dados. Aqui estão os requisitos mínimos recomendados para implantação em produção:

### **Requisitos de Hardware Mínimos**
1. **Processador (CPU)**:
   - **2 núcleos** (x86_64 ou ARM) com frequência de pelo menos 2 GHz.
   - Exemplo: Intel Core i3 ou equivalente.

2. **Memória RAM**:
   - **2 GB** de RAM para sistemas leves.
   - **4 GB** de RAM recomendados para maior estabilidade, especialmente se o banco de dados estiver no mesmo servidor.

3. **Armazenamento (Disco)**:
   - **20 GB** de espaço livre no disco para o sistema operacional, logs e banco de dados.
   - Use SSD para melhor desempenho, especialmente para o banco de dados.

4. **Rede**:
   - Conexão de rede estável com largura de banda de pelo menos **10 Mbps**.
   - Latência baixa é importante para acessos simultâneos.

5. **Sistema Operacional**:
   - Linux (Ubuntu Server 22.04 LTS ou equivalente) é recomendado para servidores de produção.
   - Alternativamente, Windows Server 2019 ou superior.

### **Requisitos de Software**
1. **Servidor Web**:
   - **Nginx** ou **Apache** para servir arquivos estáticos e como proxy reverso para o Django.
   - Django deve ser executado com um servidor de aplicação como **Gunicorn** ou **uWSGI**.

2. **Banco de Dados**:
   - **PostgreSQL** ou **MySQL** são recomendados para produção.
   - SQLite não é recomendado para produção devido a limitações de concorrência.

3. **Outros**:
   - Python 3.9 ou superior.
   - Ambiente virtual configurado com dependências instaladas (via `pip` e `requirements.txt`).

### **Configuração para 40 Acessos Simultâneos**
- **Servidor Django**:
  Configure o servidor de aplicação (Gunicorn ou uWSGI) para usar pelo menos **4 workers** (processos) para lidar com as requisições simultâneas.
- **Banco de Dados**:
  Certifique-se de que o banco de dados suporta conexões simultâneas suficientes (exemplo: configure o `max_connections` no PostgreSQL para pelo menos 50).


### **Licença**
Este projeto está licenciado sob a [MIT License](LICENSE).  

