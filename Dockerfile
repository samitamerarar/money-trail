FROM node:20-alpine
LABEL maintainer="samiarar"

WORKDIR /usr/src/app

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm install 

COPY ./ .

ENTRYPOINT npm run start