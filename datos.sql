/*
ALUMNO - arturo@arturo.com arturo123
PROFESOR - perla@perla.com perla123
ALUMNO - david@david.com david123
ALUMNO - alan@alan.com alan123
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
('DAVID','CANIZO','CORTES','H'),
('ALAN J.','PÉREZ','MARCIAL','H');

/*USUARIO*/
INSERT INTO usuario(email,contrasena,rol,foto,id_persona) VALUES
('arturo@arturo.com','$2b$10$et.F/RqAp/Bqvk5QqPyJXO4DtQPpSRQ2Dsvd3J1rUqrT20PdsNo5W','ALUMNO',null,1),
('perla@perla.com','$2b$10$6J32Kk3yX6TyE5vlQ7mzGe58O88t060kAsxUoF.nEQSHzd4sM9Wxi','PROFESOR',null,2),
('david@david.com','$2b$10$ivN1Ipwjxl7DCzXLYGOrtuOFvKRC9pdYSfS36xeDcRclhyYCokcPK','ALUMNO',null,3),
('alan@alan.com','$2b$10$Fp0lxBSEBDzUYvMjSlFmIeGSTVKDYLY2S5sT3q1H0tALy7h7.JYc.','ALUMNO',null,4);

/*ALUMNO*/
INSERT INTO alumno(matricula,id_carrera,id_persona) VALUES
(201749575,1252,1),
(201755917,1252,3),
(201758356,1252,4);

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
(201755917,31536),
(201755917,30739),
(201758356,31536),
(201758356,30739);

/*PROYECTO*/
INSERT INTO proyecto(nombre_proyecto,fecha_inicio,fecha_limite,fecha_fin,descripcion,nrc) VALUES
('PROYECTO APLICACIÓN WEB','2021-04-14','2021-05-14',null,'APLICACIÓN WEB RESPONSIVA PARA PROYECTOS ACADÉMICOS.',31536),
('PROYECTO ALGORITMO GENÉTICO','2021-04-16','2021-05-16',null,'ALGORITMO GENÉTICO IMPLEMENTADO EN MATLAB.',30739);

/*EQUIPO*/
INSERT INTO equipo(id_proyecto,matricula,estado,rol) VALUES
(1,201749575,'ACEPTADO','LIDER'),
(1,201755917,'PENDIENTE','INTEGRANTE'),
(1,201758356,'PENDIENTE','INTEGRANTE'),
(2,201749575,'PENDIENTE','INTEGRANTE'),
(2,201755917,'ACEPTADO','LIDER'),
(2,201758356,'PENDIENTE','INTEGRANTE');

/*ETAPAS*/
INSERT INTO etapa(nombre,id_proyecto,fecha_inicio,fecha_fin,estado) VALUES
('PLANEACIÓN',1,'2021-04-01','2021-04-12','FINALIZADA'),
('ANALISIS',1,'2021-04-12',null,'EN PROCESO'),
('SEMANA 1',2,'2021-03-15','2021-03-22','FINALIZADA'),
('SEMANA 2',2,'2021-03-22',null,'EN PROCESO');

/*ENTREGABLE*/
INSERT INTO entregable(id_etapa,nombre,descripcion,url_rubrica,url_entregable,calificacion,observaciones,fecha_asignacion,fecha_limite,fecha_entrega,entregado,devuelto) VALUES
(1,'HISTORIAS DE USUARIO','ENTREGAR UN DOCUMENTO CON LAS HISTORIAS DE USUARIO','1_rubrica.txt','1_entregable.txt',9.2,'NO ANEXARON EL ARCHIVO COMO PDF','2021-04-23','2021-04-30','2021-04-29',1,1),
(2,'MOCKUPS DE INTERFACES','ENTREGAR UN DOCUMENTO CON LOS MOCKUPS',null,null,null,null,'2021-05-01','2021-05-07',null,0,0),
(3,'PRIMERA PARTE ALGORITMO','EMPEZAR CON EL ALGORITMO',null,null,null,null,'2021-04-23','2021-04-30',null,0,0),
(4,'SEGUNDA PARTE ALGORITMO','TERMINAR EL ALGORITMO',null,null,null,null,'2021-05-01','2021-05-07',null,0,0);

/*NOTIFICACIONES*/
INSERT INTO notificacion(id_usuario,descripcion,fecha_notificacion,leida,url) VALUES
(1,'PERLA HERNANDEZ ha asignado un nuevo entregable.',NOW(),0,'/alumno/misProyectos/2/etapas/4/entregables/3'),
(1,'PERLA HERNANDEZ ha asignado un nuevo entregable.',NOW(),1,'/alumno/misProyectos/2/etapas/4/entregables/4'),
(3,'PERLA HERNANDEZ ha asignado un nuevo entregable.',NOW(),0,'/alumno/misProyectos/2/etapas/4/entregables/3'),
(3,'PERLA HERNANDEZ ha asignado un nuevo entregable.',NOW(),1,'/alumno/misProyectos/2/etapas/4/entregables/4'),
(4,'PERLA HERNANDEZ ha asignado un nuevo entregable.',NOW(),0,'/alumno/misProyectos/2/etapas/4/entregables/3'),
(4,'PERLA HERNANDEZ ha asignado un nuevo entregable.',NOW(),1,'/alumno/misProyectos/2/etapas/4/entregables/4');
