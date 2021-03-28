CREATE TABLE IF NOT EXISTS productos (
  id_producto INT(10) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(255) NOT NULL,
  descripcion VARCHAR(255) NOT NULL,
  precio DECIMAL(8,2) NOT NULL
) DEFAULT CHARSET=UTF8;

CREATE TABLE IF NOT EXISTS usuarios (
  id_usuario INT(10) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nombre_usuario VARCHAR(45) NOT NULL,
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
  id_usuario INT(10) NOT NULL,
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
) DEFAULT CHARSET=UTF8;

CREATE TABLE IF NOT EXISTS detallePedidos (
  detalle_pedido_id INT(10) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  id_pedido INT(10) NOT NULL,
  id_producto INT(10) NOT NULL,
  cantidad_producto INT(10) NOT NULL,
  FOREIGN KEY(id_pedido) REFERENCES pedidos(id_pedido),
  FOREIGN KEY(id_producto) REFERENCES productos(id_producto)
) DEFAULT CHARSET=UTF8;