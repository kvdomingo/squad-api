FROM node:12-slim

WORKDIR /app

RUN npm i -g serve

COPY package.json .
COPY package-lock.json .

RUN npm i

COPY . .

RUN npm run build

EXPOSE 8080

CMD ["serve", "-s", "build", "-l", "8080"]
