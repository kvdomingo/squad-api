release: python manage.py migrate
web: gunicorn squad_api.wsgi -w 4 --log-file -
