FROM python:3.10-bullseye as base

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1
ENV POETRY_VERSION 1.1.12

RUN pip install poetry==$POETRY_VERSION

FROM base as dev

WORKDIR /backend

COPY pyproject.toml poetry.lock ./

RUN poetry config virtualenvs.create false && \
    poetry install --no-interaction --no-ansi

ENTRYPOINT [ "gunicorn", "squad_api.wsgi", "-b", "0.0.0.0:5000", "-c", "./gunicorn.conf.py", "--reload" ]

FROM node:16-alpine as build

WORKDIR /web

COPY ./web/app/package.json ./web/app/yarn.lock ./web/app/tsconfig.json ./

RUN yarn

COPY ./web/app/public/ ./public/
COPY ./web/app/src/ ./src/

RUN yarn build

FROM base as prod

WORKDIR /tmp

COPY pyproject.toml poetry.lock ./

RUN poetry export -f requirements.txt | pip install --no-cache-dir -r /dev/stdin

WORKDIR /backend

COPY ./api/ ./api/
COPY ./squad_api/ ./squad_api/
COPY ./*.py ./
COPY ./*.sh ./
COPY --from=build /web/build ./web/app/

RUN chmod +x docker-entrypoint.sh

EXPOSE $PORT

ENTRYPOINT [ "./docker-entrypoint.sh" ]
