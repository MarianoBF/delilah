USE DelilahTestdb;

INSERT INTO usuarios VALUES (1, 'Adminprueba1', 'prueba@prueba.com', '$2a$08$A98dvYRirtpjWyhGTygzXOhy0l1Cwk.jgwfHdNE3NvblzSdJxjePe', "administrador", "Usuario de Prueba1");
INSERT INTO usuarios VALUES (2, 'Usuarioprueba2', 'prueba@prueba.com', '$2a$08$A98dvYRirtpjWyhGTygzXOhy0l1Cwk.jgwfHdNE3NvblzSdJxjePe', "usuario", "Usuario de Prueba2");
INSERT INTO usuarios VALUES (3, 'Usuarioprueba3', 'prueba@prueba.com', '$2a$08$A98dvYRirtpjWyhGTygzXOhy0l1Cwk.jgwfHdNE3NvblzSdJxjePe', "usuario", "Usuario de Prueba3");

INSERT INTO productos VALUES (1, 'tostado', 'Un producto de prueba1', 100);
INSERT INTO productos VALUES (2, 'hamburguesa', 'Un producto de prueba2', 300);
INSERT INTO productos VALUES (3, 'tostado2', 'Un producto de prueba3', 100.50);
INSERT INTO productos VALUES (4, 'tostado especial', 'Un producto de prueba4', 200);
INSERT INTO productos VALUES (5, 'milanesa', 'Un producto de prueba5', 450);

INSERT INTO pedidos VALUES (1, 'pendiente', '2021-03-01 09:20:20', 'tarjeta', 1050, "", 2);
INSERT INTO pedidos VALUES (2, 'en camino', '2021-03-01 09:20:20', 'tarjeta', 2902, "Enviar servilletas extra", 2);
INSERT INTO pedidos VALUES (3, 'cancelado', '2021-03-05 09:20:20', 'efectivo', 802, "", 2);
INSERT INTO pedidos VALUES (4, 'en camino', '2021-03-05 09:20:20', 'tarjeta', 2900, "", 3);

INSERT INTO detallePedidos VALUES (2, 1, 2, 1);
INSERT INTO detallePedidos VALUES (1, 1, 1, 3);
INSERT INTO detallePedidos VALUES (3, 1, 5, 1);

INSERT INTO detallePedidos VALUES (4, 2, 3, 4);
INSERT INTO detallePedidos VALUES (5, 2, 2, 5);
INSERT INTO detallePedidos VALUES (6, 2, 4, 5);

INSERT INTO detallePedidos VALUES (7, 3, 1, 4);
INSERT INTO detallePedidos VALUES (8, 3, 3, 4);

INSERT INTO detallePedidos VALUES (9, 4, 4, 2);
INSERT INTO detallePedidos VALUES (10, 4, 1, 10);
INSERT INTO detallePedidos VALUES (11, 4, 2, 2);
INSERT INTO detallePedidos VALUES (12, 4, 5, 2);


