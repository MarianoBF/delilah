CREATE TABLE IF NOT EXISTS productos (
  id_producto INT(10) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(255) NOT NULL,
  descripcion VARCHAR(255) NOT NULL,
  precio DECIMAL(8,2) NOT NULL
) DEFAULT CHARSET=UTF8;

CREATE TABLE IF NOT EXISTS usuarios (
  id_usuario INT(10) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nombre_usuario VARCHAR(45) NOT NULL,
  email VARCHAR(75) NOT NULL,
  password VARCHAR(75) NOT NULL,
  rol VARCHAR(45) NOT NULL,
  nombre_completo VARCHAR(255) NOT NULL
) DEFAULT CHARSET=UTF8;

CREATE TABLE IF NOT EXISTS pedidos (
  id_pedido INT(10) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  estado VARCHAR(45) NOT NULL,
  hora datetime NOT NULL,
  pago_via VARCHAR(45) NOT NULL,
  pago_monto DECIMAL(8,2) NOT NULL,
  observaciones VARCHAR(200),
  id_usuario INT(10) NOT NULL,
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
) DEFAULT CHARSET=UTF8;

CREATE TABLE IF NOT EXISTS detallePedidos (
  id_detallePedidos INT(10) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  id_pedido INT(10) NOT NULL,
  id_producto INT(10) NOT NULL,
  cantidad_producto INT(10) NOT NULL,
  FOREIGN KEY(id_pedido) REFERENCES pedidos(id_pedido),
  FOREIGN KEY(id_producto) REFERENCES productos(id_producto)
) DEFAULT CHARSET=UTF8;

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


