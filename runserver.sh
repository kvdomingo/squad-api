#!/bin/sh

python manage.py collectstatic --noinput
python manage.py migrate
gunicorn squad_api.asgi:application -b 0.0.0.0:$PORT -k uvicorn.workers.UvicornH11Worker --log-file -
