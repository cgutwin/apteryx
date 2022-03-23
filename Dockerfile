FROM node:lts-alpine as build
WORKDIR /usr/src/apteryx

COPY package*.json ./
RUN npm ci

COPY tsconfig.json ./
COPY src src
RUN npm run build

FROM node:lts-alpine as run
WORKDIR /usr/src/apteryx
ENV NODE_ENV=production

COPY package.json ./
RUN npm install

COPY --from=build /usr/src/apteryx/lib lib/
COPY ./data/migrations ./data/migrations
COPY knexfile.js ./
COPY docker-entrypoint.sh /usr/local/bin/
COPY pm2.config.js ./

# todo: no 777
RUN chmod 777 /usr/local/bin/docker-entrypoint.sh && \
    ln -s usr/local/bin/docker-entrypoint.sh / # backwards compat

RUN npm install pm2 -g

ENTRYPOINT [ "docker-entrypoint.sh" ]
EXPOSE 5000
CMD [ "pm2-runtime", "start", "pm2.config.js" ]
