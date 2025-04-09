# Usamos una imagen base de Apache
FROM httpd:2.4

# Copiamos nuestro código al directorio donde Apache lo servirá
COPY ./dist/fctretos /usr/local/apache2/htdocs/

# Exponemos el puerto 80
EXPOSE 8181
