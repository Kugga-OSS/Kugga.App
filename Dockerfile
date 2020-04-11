FROM node:10
COPY ./ /app
WORKDIR /app
RUN npm install 
RUN npm run build

FROM nginx
RUN mkdir /app && mkdir /docker && mkdir /docker/sslkey
COPY --from=0 /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf