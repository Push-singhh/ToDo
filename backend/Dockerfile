FROM python:3.12-slim
RUN apt-get update && apt-get install -y \
 default-libmysqlclient-dev \
 pkg-config \
 gcc \
 pkg-config \
 && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
#EXPOSE 8000
#CMD ["gunicorn", "todo.wsgi:application", "--bind", "0.0.0.0:8000"]
