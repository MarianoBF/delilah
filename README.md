## Instalation

1. Define environment variables (sample.env provided)
    * DB_PASS
    * DB_HOST
    * DB_USER
    * DB_NAME
    * SECRET
1. `npm install`
1. To load DB structure: `mysql < initial_structure.sql -u [USERNAME] -p` 
1. To load sample dataset: `mysql < initial_data.sql -u [USERNAME] -p`
1. `node server.js`
1. Create a user, admin is the default user role
1. Documentation served on `/docs`

## Instalación

1. Defina las variables de entorno requeridas (se provee sample.env para completar y renombrar a .env)
    * DB_PASS
    * DB_HOST
    * DB_USER
    * DB_NAME
    * SECRET
1. `npm install`
1. Para cargar la estructura de la base de datos: `mysql < initial_structure.sql -u [USERNAME] -p` 
1. Para cargar un dataset de ejemplo: `mysql < initial_data.sql -u [USERNAME] -p`
1. `node server.js`
1. Crear un usuario, el rol predeterminado es Admin
1. Documentación en `/docs`
