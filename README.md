# MDW-PA-BackEnd

Web development models - Application of academic projects (Back-end)

Live: https://mdw-pa-backend.herokuapp.com/api/v1

## Test data up to V6

Execute the "datos_prueba.sql" script to be able to access all the functionalities implemented so far.

### NOTE

Remember to uncomment line 80 of the /src/models/alumno.js file and run the server, in this way all the models will be created in the DB. Once the tables are created, comment the line of code again and, finally, fill the db with "data.sql".

An .env file is required to work; the required fields are the following:

- NODE_ENV -> environment (production | development)
- HOST -> url of the server (localhost | ip_address)
- DB_NAME -> MySQL database name, registro_escolar name suggested
- DB_USER -> MySQL database user
- DB_PASSWORD -> mysql database password
- DB_HOST -> url of the bd MySQL server (localhost | ipaddress)
