FROM node:20 AS build

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install
COPY . ./

RUN yarn build

FROM nginx:1.19-alpine
RUN apk update && apk add --no-cache bash

COPY --from=build /app/dist /usr/share/nginx/html
COPY 404.conf /etc/nginx/conf.d/404.conf
