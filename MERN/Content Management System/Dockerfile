FROM node:19.6.0-bullseye-slim
MAINTAINER totaljs "info@totaljs.com"

RUN apt-get update
RUN apt-get install -y --no-install-recommends graphicsmagick && rm -rf /var/lib/apt/lists/*

VOLUME /www
WORKDIR /www
RUN mkdir -p /www/bundles

COPY index.js .
COPY config .
COPY package.json .
COPY cms.bundle ./bundles/

RUN npm install
EXPOSE 8000

CMD [ "npm", "start" ]