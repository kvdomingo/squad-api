FROM pypy:3.8-7-buster as base

RUN python -m pip install --no-cache-dir -U pip setuptools

COPY requirements.txt /tmp/requirements.txt

RUN pip install --no-cache-dir -r /tmp/requirements.txt

FROM base as dev

WORKDIR /backend

ENTRYPOINT gunicorn squad_api.wsgi -b 0.0.0.0:5000 \
           --workers 2 \
           --threads 4 \
           --log-file - \
           --capture-output \
           --reload

FROM node:16-alpine as build

COPY ./web/app/ /web/app/

WORKDIR /web/app

RUN yarn install --prod

RUN yarn build

FROM base as prod

WORKDIR /backend

COPY ./api/ ./api/
COPY ./squad_api/ ./squad_api/
COPY ./*.py ./
COPY --from=build /web/app/build ./web/app/

EXPOSE $PORT

ENTRYPOINT python manage.py collectstatic --noinput && \
           python manage.py migrate && \
           gunicorn squad_api.wsgi --workers 1 --threads 1 -b 0.0.0.0:$PORT --log-file -
