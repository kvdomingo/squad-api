FROM python:3.8.9-slim

ENV DEBUG=$DEBUG
ENV SECRET_KEY=$SECRET_KEY
ENV PYTHON_ENV=$PYTHON_ENV
ENV DATABASE_URL=$DATABASE_URL

WORKDIR /app

COPY requirements.txt .

RUN python -m pip install -U pip && pip install -r requirements.txt

COPY . .

RUN python manage.py collectstatic --noinput

EXPOSE 8080

RUN python manage.py migrate

CMD ["gunicorn", "squad_api.wsgi", "--log-file", "-"]
