
# TFC-Frontend

Este proyecto es la aplicación frontend desarrollada en Angular 14. 
En este documento se describen los pasos necesarios para generar la build de producción, desplegar la aplicación utilizando Apache en un contenedor Docker y, adicionalmente, cómo probar la build en local.

## Despliegue en desarrollo
Para trabajar con este proyecto en local sigue los siguientes pasos:
### Instalar dependencias
````bash
npm install
````

### Levantar server en desarrollo
````bash
ng serve
````
El proyecto estará disponible en `http://localhost:4200`.
## Despliegue en produccion

Para llevar a angular a producción necesitaremos una build dedicada a ello, lo generaremos con este comando dentro del proyecto (para versiones de Angular 14 o anteriores):

    ng build --configuration production

Al ejecutar el comando nos creará una carpeta **dist**, dentro nos encontraremos el proyecto para enviarlo a la maquina

    scp <ruta del /dist> UsuarioReceptor@IP:<ruta destino>

## Despliegue con Apache
Ya teniendo el proyecto en la maquina crearemos una imagen y un contenedor para desplegar el proyecto de Angular

[Dockerfile Apache](./FCT_front/Dockerfile)

[Docker-compose Apache](./FCT_front/docker-compose.yml)
