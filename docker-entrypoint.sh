#!/usr/bin/env sh

npm run knex:migrate:latest
exec "$@"
