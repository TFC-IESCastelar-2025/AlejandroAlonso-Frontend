# Usamos la imagen oficial de NGINX
FROM nginx:alpine

COPY ./dist/fctretos /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponemos el puerto 80
EXPOSE 80
