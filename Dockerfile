FROM node:lts-alpine as build
# Install corepack into the lts-alpine version for use with yarn^3.
RUN npm uninstall -g yarn pnpm
RUN npm install -g corepack

WORKDIR /usr/src/apteryx

COPY package.json ./

RUN yarn

COPY tsconfig.json ./
COPY src ./src

RUN yarn run tsc

FROM node:lts-alpine

ARG PG_DATABASE
ARG PG_HOST
ARG PG_PASSWORD
ARG PG_PASSWORD
ARG PG_PORT

ENV NODE_ENV=production
ENV PORT=4000
ENV PG_DATABASE=${PG_DATABASE}
ENV PG_HOST=${PG_HOST}
ENV PG_PASSWORD=${PG_PASSWORD}
ENV PG_PORT=${PG_PORT}

WORKDIR /usr/node/apteryx

COPY data ./data
COPY knexfile.js ./
COPY --from=build /usr/src/apteryx/package.json ./
COPY --from=build /usr/src/apteryx/lib ./lib

RUN npm i

EXPOSE ${PORT}
