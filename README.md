# TFC-Frontend

Para llevar a angular a producción necesitaremos una build dedicada a ello, lo generaremos con este comando dentro del proyecto (para versiones de Angular 14 o anteriores):

    ng build --configuration production

Al ejecutar el comando nos creará una carpeta **dist**, dentro nos encontraremos el proyecto para enviarlo a la maquina

    scp <ruta del .jar> UsuarioReceptor@IP:<ruta destino>

## Despliegue con Apache
Ya teniendo el proyecto en la maquina crearemos una imagen y un contenedor para desplegar el proyecto de Angular

[Dockerfile Apache](./FCT_front/Dockerfile)

[Docker-compose Apache](./FCT_front/docker-compose.yml)