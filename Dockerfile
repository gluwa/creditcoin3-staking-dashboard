# hadolint global ignore=DL3016

# build environment
FROM node:24@sha256:392e1e23f34da768d8d1f4e502b64f200d3be3465934d4b7930f57d7e2fc1989 AS build
ARG TARGET_NETWORK=""

WORKDIR /app
COPY . .
RUN yarn policies set-version '3.3.1'

RUN yarn install \
&& VITE_ENVIRONMENT=${TARGET_NETWORK} yarn build

# production environment
FROM nginx:1.30.3-alpine@sha256:0d3b80406a13a767339fbe2f41406d6c7da727ab89cf8fae399e81f780f814d1
RUN apk add --no-cache libcap \
&& setcap 'cap_net_bind_service=+ep' /usr/sbin/nginx \
&& chown -R nginx:nginx /var/cache/nginx /var/log/nginx /etc/nginx/conf.d \
&& sed -i 's#pid\s*/run/nginx.pid;#pid /tmp/nginx.pid;#' /etc/nginx/nginx.conf
USER nginx
HEALTHCHECK CMD wget -O /dev/null http://localhost || exit 1
COPY --from=build --chown=nginx:nginx /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
