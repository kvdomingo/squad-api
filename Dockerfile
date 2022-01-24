FROM pypy:3.8-7-buster as base

RUN python -m pip install --no-cache-dir -U pip setuptools

COPY requirements.txt /tmp/requirements.txt

RUN pip install --no-cache-dir -r /tmp/requirements.txt

RUN sed -i "s/'_headers'/'headers'/" /opt/pypy/lib/pypy3.8/site-packages/revproxy/utils.py
RUN sed -i "s/'_headers'/'headers'/" /opt/pypy/lib/pypy3.8/site-packages/revproxy/response.py

FROM base as dev

WORKDIR /backend

EXPOSE $PORT

ENTRYPOINT gunicorn squad_api.wsgi -w 8 -b 0.0.0.0:$PORT --reload

FROM node:16-alpine as build

COPY ./web/app/ /web/app/

WORKDIR /web/app

RUN npm install

RUN npm run build

FROM base as prod

WORKDIR /backend

COPY ./api/ ./api/
COPY ./squad_api/ ./squad_api/
COPY ./*.py ./
COPY ./*.sh ./
COPY --from=build /web/app/build ./web/app/

EXPOSE $PORT

ENTRYPOINT [ "sh", "runserver.sh" ]
