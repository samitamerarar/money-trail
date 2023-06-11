FROM node:20-alpine
LABEL maintainer="samiarar"

WORKDIR /usr/src/app

COPY ./package.json ./
COPY ./package-lock.json ./

RUN yarn install 

COPY ./ .

RUN yarn --cwd client install && yarn --cwd client run build

COPY ./ .

ENTRYPOINT yarn run dev