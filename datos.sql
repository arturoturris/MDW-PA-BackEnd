/*
ALUMNO - arturo@arturo.com arturo123
PROFESOR - perla@perla.com perla123
ALUMNO - geovani@geovani.com geovani.com
*/

/*CARRERAS*/
INSERT INTO carrera(id_carrera,nombre) VALUES
(1250,'INGENIERÍA EN CIENCIAS DE LA COMPUTACIÓN'),
(1251,'LICENCIATURA EN CIENCIAS DE LA COMPUTACIÓN'),
(1252,'INGENIERÍA EN TECNOLOGÍAS DE LA INFORMACIÓN');

/*PERSONAS*/
INSERT INTO persona(nombre,paterno,materno,sexo) VALUES
('LUIS ARTURO','TENORIO','LÓPEZ','H'),
('PERLA', 'HERNÁNDEZ','JUÁREZ','M'),
('GEOVANI','DIAZ','AQUINO','H');

/*USUARIO*/
INSERT INTO usuario(email,contrasena,rol,foto,id_persona) VALUES
('arturo@arturo.com','$2b$10$et.F/RqAp/Bqvk5QqPyJXO4DtQPpSRQ2Dsvd3J1rUqrT20PdsNo5W','ALUMNO',null,1),
('perla@perla.com','$2b$10$6J32Kk3yX6TyE5vlQ7mzGe58O88t060kAsxUoF.nEQSHzd4sM9Wxi','PROFESOR',null,2),
('geovani@geovani.com','$2b$10$ti3AKgDa92kXlff.OYGcHeO8jUUhrYNNjYTnMgEGp7W9C85km7/sy','ALUMNO',null,3);

/*ALUMNO*/
INSERT INTO alumno(matricula,id_carrera,id_persona) VALUES
(201749575,1252,1),
(201749577,1252,3);

/*PROFESOR*/
INSERT INTO profesor(matricula,id_persona) VALUES
(201749576,2);

/*PERIODO*/
INSERT INTO periodo(nombre) VALUES
('PRIMAVERA 2021'),
('VERANO 2021'),
('OTOÑO 2021');

/*MATERIAS*/
INSERT INTO materia(nrc,id_periodo,nombre,clave,seccion,profesor) VALUES
(31536,1,'MODELOS DE DESARROLLO WEB','ITIS',10001,201749576),
(30739,2,'INTELIGENCIA ARTIFICIAL','ITIS',10002,201749576);

/*Alumno_Materia*/
INSERT INTO carga_academica(alumno_matricula,materia_nrc) VALUES
(201749575,31536),
(201749575,30739),
(201749577,31536),
(201749577,30739);

/*PROYECTO*/
INSERT INTO proyecto(nombre_proyecto,fecha_inicio,fecha_limite,fecha_fin,descripcion,nrc,coordinador) VALUES
('Proyecto aplicación web','2021-04-14','2021-05-14',null,'Aplicación web responsiva para proyectos',31536,201749575),
('Proyecto algoritmo genetico','2021-04-16','2021-05-16',null,'Algoritmo genetico implementado en Matlab',30739,201749577);

/*EQUIPO*/
INSERT INTO equipo(id_proyecto,matricula) VALUES
(1,201749575),
(1,201749577),
(2,201749575),
(2,201749577);
