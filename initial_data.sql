CREATE DATABASE IF NOT EXISTS productsDB;

USE productsDB;

INSERT INTO usuarios VALUES (1, 'adminProbando', 'prueba@prueba.com', '$2a$08$WGvIklO7T1S2.7Hw8r7uauT0McpeMrqG.okt6qdfKtX93Yl1F9yh.', "administrador", "Usuario de Prueba1", "Cochabamba 1614 4°A", "4444-4488", 0) ON DUPLICATE KEY UPDATE id_usuario = id_usuario;
INSERT INTO usuarios VALUES (2, 'Usuarioprueba2', 'prueba2@prueba.com', '$2a$08$A98dvYRirtpjWyhGTygzXOhy0l1Cwk.jgwfHdNE3NvblzSdJxjePe', "usuario", "Usuario de Prueba2", "Cochabamba 1614 4°A", "4444-4488", 0) ON DUPLICATE KEY UPDATE id_usuario = id_usuario;
INSERT INTO usuarios VALUES (3, 'Usuarioprueba3', 'prueba3@prueba.com', '$2a$08$A98dvYRirtpjWyhGTygzXOhy0l1Cwk.jgwfHdNE3NvblzSdJxjePe', "usuario", "Usuario de Prueba3", "Cochabamba 1614 4°A", "4444-4488", 0) ON DUPLICATE KEY UPDATE id_usuario = id_usuario;

INSERT INTO productos VALUES (1, 'tostado', 'Un producto de prueba1', 100, 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Greyhound_stock_certificate.jpg/1024px-Greyhound_stock_certificate.jpg', 0);
INSERT INTO productos VALUES (2, 'hamburguesa', 'Un producto de prueba2', 300, 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Greyhound_stock_certificate.jpg/1024px-Greyhound_stock_certificate.jpg', 0);
INSERT INTO productos VALUES (3, 'tostado2', 'Un producto de prueba3', 100.50, 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Greyhound_stock_certificate.jpg/1024px-Greyhound_stock_certificate.jpg', 0);
INSERT INTO productos VALUES (4, 'tostado especial', 'Un producto de prueba4', 200, 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Greyhound_stock_certificate.jpg/1024px-Greyhound_stock_certificate.jpg', 0);
INSERT INTO productos VALUES (5, 'milanesa', 'Un producto de prueba5', 450, 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Greyhound_stock_certificate.jpg/1024px-Greyhound_stock_certificate.jpg', 0);

INSERT INTO pedidos VALUES (1, 'confirmado', '2021-03-01 09:20:20', 'tarjeta', 1050, "", 2, 0);
INSERT INTO pedidos VALUES (2, 'preparando', '2021-03-01 09:20:20', 'tarjeta', 2902, "Enviar servilletas extra", 2, 0);
INSERT INTO pedidos VALUES (3, 'entregado', '2021-03-05 09:20:20', 'efectivo', 802, "", 2, 0);
INSERT INTO pedidos VALUES (4, 'enviando', '2021-03-05 09:20:20', 'tarjeta', 2900, "", 3, 0);
INSERT INTO pedidos VALUES (5, 'nuevo', '2021-03-01 09:20:20', 'tarjeta', 3000, "", 2, 0);
INSERT INTO pedidos VALUES (6, 'cancelado', '2021-03-01 09:20:20', 'tarjeta', 1000, "", 2, 0);

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



