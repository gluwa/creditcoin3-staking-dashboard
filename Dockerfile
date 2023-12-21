# build environment
FROM node:21 as build

WORKDIR /tmp
RUN npm install yarn --legacy-peer-deps

WORKDIR /app
COPY . .
RUN git config --global url."https://github.com/".insteadOf git@github.com: \
 && git config --global url."https://".insteadOf ssh://git \
 && yarn install \
 && yarn build

# production environment
FROM nginx:1.25.3-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
