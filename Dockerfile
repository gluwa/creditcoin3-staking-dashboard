# hadolint global ignore=DL3016
# checkov:skip=CKV_DOCKER_3:Ensure that a user for the container has been created
ARG TARGET_NETWORK=""

# build environment
FROM node:21 as build

WORKDIR /app
COPY . .
RUN yarn policies set-version '3.3.1'

RUN yarn install \
&& yarn run build:$TARGET_NETWORK

# production environment
FROM nginx:1.25.3-alpine
HEALTHCHECK CMD wget -O /dev/null http://localhost || exit 1
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
