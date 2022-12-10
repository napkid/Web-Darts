FROM node:16 as builder

COPY . /app
WORKDIR /app

RUN npm ci \
    && npm run build

FROM caddy/caddy:2.6.2-alpine

COPY --from=builder /app/dist /srv/app
WORKDIR /srv/app

CMD [ "caddy", "file-server" ]