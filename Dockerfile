FROM node:20-alpine
LABEL maintainer="samiarar"

WORKDIR /usr/src/app

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm install 

COPY ./ .

RUN npm install --prefix client && npm run build --prefix client

COPY ./ .

ENTRYPOINT npm run dev