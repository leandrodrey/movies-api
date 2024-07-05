# Codo a Codo 2024 - Proyecto Final

API RESTful para una aplicación de catálogo de películas. Este proyecto fue desarrollado como parte del curso de Node.js de Codo a Codo 2024.

## Tecnologías Utilizadas

Este proyecto está construido con las siguientes tecnologías:

- **express 4.19.2**: El framework web de Node.js utilizado para crear la API.
- **mysql2 3.10.1**: El controlador de MySQL para Node.js, utilizado para interactuar con la base de datos.
- **cors 2.8.5**: Para habilitar el Intercambio de Recursos de Origen Cruzado (CORS) y permitir solicitudes desde diferentes dominios.
- **cookie-parser 1.4.6**: Para analizar y manejar cookies en las solicitudes HTTP.
- **jsonwebtoken 9.0.2**: Para generar y verificar tokens JSON Web Tokens (JWT) para la autenticación.
- **uuid 10.0.0**: Para generar identificadores únicos universales (UUID).
- **bcrypt 5.1.1**: Para el hasheo y comparación segura de contraseñas.
- **zod 3.23.8**: Para la validación de esquemas de datos y asegurar la integridad de los datos entrantes.
- **swagger-jsdoc 6.2.8**: Para generar documentación de la API en formato OpenAPI/Swagger.
- **swagger-ui-express 5.0.1**: Para servir la interfaz de usuario de Swagger, que permite visualizar y probar los endpoints de la API.
- **nodemon 3.1.4**: Para reiniciar automáticamente el servidor durante el desarrollo cuando se realizan cambios en los archivos. (dependencia de desarrollo)
- **dotenv 16.4.5**: Para cargar variables de entorno desde un archivo `.env`. (dependencia de desarrollo)

Además, utiliza:

- **npm**: Como gestor de paquetes para instalar y administrar las dependencias del proyecto.

Dependencias de desarrollo:

- **@eslint/js 9.6.0, eslint 9.6.0, globals 15.8.0**: Herramientas de linting para mantener un código limpio y consistente. (dependencias de desarrollo)

## Instalación

Sigue estos pasos para ejecutar este proyecto localmente:

1. Clona el repositorio: `git clone https://github.com/leandrodrey/Codo-a-Codo-JS-API`
2. Navega hacia el directorio del proyecto: `cd nombre-de-tu-proyecto`
3. Instala las dependencias: `npm install`
4. Inicia el servidor: `npm run start`

Si no tienes node instalado puedes descargarlo desde [aquí](https://nodejs.org/en/download/).

# Documentación de la API

Esta API te permite gestionar una colección de películas y provee funcionalidades de autenticación de usuarios.

A continuación se detallan los endpoints disponibles y cómo utilizarlos.

Si prefiere una interfaz gráfica para interactuar con la API, puedes acceder a la documentación de Swagger en la ruta `/api-docs`.

## Endpoints de Películas

### GET Obtener Todas las Películas

Obtiene una lista de todas las películas en la base de datos.

- **Endpoint:** `/movies`
- **Método:** GET

### GET Obtener Película por ID

Obtiene una película específica por su ID único.

- **Endpoint:** `/movies/{id}`
- **Método:** GET
- **Parámetro de Ruta:**
    - `id`: El identificador único de la película.

### POST Crear una Nueva Película

Crea una nueva entrada de película en la base de datos. Requiere un body JSON con los siguientes campos (todos los campos son obligatorios a menos que se marquen como opcionales):

- **Endpoint:** `/movies`
- **Método:** POST
- **Body (JSON):**
    - `title` (string)
    - `year` (number)
    - `duration` (number, en minutos)
    - `poster` (string, URL de la imagen del póster)
    - `rate` (number)
    - `trailer` (string, URL del video del tráiler)
    - `status` (string, por ejemplo, "Estrenada", "En Producción")
    - `budget` (number, opcional)
    - `revenue` (number, opcional)
    - `actors` (array de string)
    - `directors` (array de string)
    - `genres` (array de string)
    - `overview` (string)

### DELETE Eliminar Película por ID

Elimina una película específica por su ID único.

- **Endpoint:** `/movies/{id}`
- **Método:** DELETE
- **Parámetro de Ruta:**
    - `id`: El identificador único de la película.

### PATCH Actualizar Película por ID (Actualización Parcial)

Actualiza campos específicos de una película por su ID único. Proporciona solo los campos que deseas modificar en el body JSON.

- **Endpoint:** `/movies/{id}`
- **Método:** PATCH
- **Parámetro de Ruta:**
    - `id`: El identificador único de la película.
- **Body (JSON):** Cualquier campo de la petición POST puede ser incluido.

## Endpoints de Autenticación de Usuarios

### POST Crear un Nuevo Usuario (Registro)

Registra una nueva cuenta de usuario.

- **Endpoint:** `/auth/register`
- **Método:** POST
- **Cuerpo (JSON):**
    - `name` (string)
    - `lastname` (string)
    - `email` (string)
    - `password` (string)
    - `birthdate` (string, formato: "YYYY-MM-DD")
    - `country` (string)

### POST Iniciar Sesión de Usuario

Inicia sesión con una cuenta de usuario existente.

- **Endpoint:** `/auth/login`
- **Método:** POST
- **Cuerpo (JSON):**
    - `email` (cadena)
    - `password` (cadena)

### GET Verificar Estado de Inicio de Sesión

Verifica si el usuario actual ha iniciado sesión.

- **Endpoint:** `/auth`
- **Método:** GET

### POST Cerrar Sesión de Usuario

Cierra la sesión del usuario actual.

- **Endpoint:** `/auth/logout`
- **Método:** POST

## Manejo de Errores

La API devolverá los códigos de estado HTTP apropiados para solicitudes exitosas (por ejemplo, 200 OK, 201 Created) y errores (por ejemplo, 400 Bad Request, 404 Not Found). Las respuestas de error se proporcionarán en formato JSON con una descripción del problema.
