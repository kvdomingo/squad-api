FROM python:3.8.9-slim

WORKDIR /app

COPY requirements.txt .

RUN python -m pip install -U pip && pip install -r requirements.txt

COPY . .

RUN python manage.py collectstatic --noinput

EXPOSE 8080

RUN python manage.py migrate

CMD ["gunicorn", "squad_api.wsgi", "--log-file", "-"]
