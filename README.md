##Instalación


1. Defina las variables de entorno requeridas (opcionalmente se provee sample.env para completar y renombrar a .env)
    *DB_PASS
    *DB_HOST
    *DB_USER
    *SECRET
1. npm install
1. Para cargar la estructura de la base de datos, mysql < initial_structure.sql -u [USERNAME] -p 
1. Para cargar un dataset de ejemplo, run mysql < initial_data.sql -u [USERNAME] -p
1. node server.js