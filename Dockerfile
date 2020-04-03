FROM node:10
COPY ./ /app
WORKDIR /app
RUN npm config set registry " https://registry.npm.taobao.org " && npm install && npm run build

FROM nginx
RUN mkdir /app && mkdir /docker && mkdir /docker/sslkey
COPY --from=0 /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf