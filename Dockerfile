FROM python:3.8.9-slim

WORKDIR /app

COPY requirements.txt .

RUN python -m pip install -U pip
RUN pip install -r requirements.txt

COPY . .

ENV SECRET_KEY=$SECRET_KEY
ENV DATABASE_URL=$DATABASE_URL

RUN python manage.py collectstatic --noinput

RUN python manage.py migrate

EXPOSE 8080

ENTRYPOINT [ "gunicorn", "squad_api.wsgi", "-b", "0.0.0.0:8080", "--log-file", "-" ]
