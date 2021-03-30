USE DelilahTestdb;

INSERT INTO usuarios VALUES (1, 'Adminprueba1', 'prueba@prueba.com', '$2a$08$A98dvYRirtpjWyhGTygzXOhy0l1Cwk.jgwfHdNE3NvblzSdJxjePe', "Administrador", "Usuario de Prueba1");
INSERT INTO usuarios VALUES (2, 'prueba2', 'prueba@prueba.com', '$2a$08$A98dvYRirtpjWyhGTygzXOhy0l1Cwk.jgwfHdNE3NvblzSdJxjePe', "Cliente", "Usuario de Prueba2");
INSERT INTO usuarios VALUES (3, 'prueba3', 'prueba@prueba.com', '$2a$08$A98dvYRirtpjWyhGTygzXOhy0l1Cwk.jgwfHdNE3NvblzSdJxjePe', "Cliente", "Usuario de Prueba3");

INSERT INTO productos VALUES (1, 'prod_prueba1', 'Un producto de prueba1', 100);
INSERT INTO productos VALUES (2, 'prod_prueba2', 'Un producto de prueba1', 300);
INSERT INTO productos VALUES (3, 'prod_prueba3', 'Un producto de prueba1', 100.50);
INSERT INTO productos VALUES (4, 'prod_prueba4', 'Un producto de prueba1', 200);
INSERT INTO productos VALUES (5, 'prod_prueba5', 'Un producto de prueba1', 450);

INSERT INTO pedidos VALUES (1, 'pendiente', '2021-03-01 09:20:20', 'tarjeta', 1050, "", 2);
INSERT INTO pedidos VALUES (2, 'en camino', '2021-03-01 09:20:20', 'tarjeta', 2902, "Enviar servilletas extra", 3);


INSERT INTO detallePedidos VALUES (2, 1, 2, 1);
INSERT INTO detallePedidos VALUES (1, 1, 1, 3);
INSERT INTO detallePedidos VALUES (3, 1, 5, 1);

INSERT INTO detallePedidos VALUES (4, 2, 3, 4);
INSERT INTO detallePedidos VALUES (5, 2, 2, 5);
INSERT INTO detallePedidos VALUES (6, 2, 4, 5);


