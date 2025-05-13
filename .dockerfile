# Use uma imagem base do Python
FROM python:3.9-slim

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de dependências para o container
COPY requirements.txt /app/

# Instala as dependências do projeto
RUN pip install --no-cache-dir -r requirements.txt

# Copia todo o código do projeto para o container
COPY . /app/

# Configura as variáveis de ambiente para o Django
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Expõe a porta 8000 para o servidor Django
EXPOSE 8000

# Comando para rodar o servidor Django
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "observatorio.wsgi:application"]