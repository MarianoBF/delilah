const mysql = require("mysql2");
const dbConfig = require("../config/db.config");

const connection = mysql.createPool({
  connectionLimit: 5,
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
});

module.exports = connection;

connection.query(`CREATE TABLE IF NOT EXISTS usuarios (
    id_usuario INT(10) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre_usuario VARCHAR(45) NOT NULL UNIQUE,
    email VARCHAR(75) NOT NULL UNIQUE,
    password VARCHAR(75) NOT NULL,
    rol VARCHAR(45) NOT NULL,
    nombre_completo VARCHAR(255) NOT NULL UNIQUE,
    direccion VARCHAR(255) NOT NULL,
    telefono VARCHAR(255) NOT NULL
  ) DEFAULT CHARSET=UTF8;`);

connection.query(`CREATE TABLE IF NOT EXISTS productos (
    id_producto INT(10) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(255) NOT NULL UNIQUE,
    descripcion VARCHAR(255),
    precio DECIMAL(8,2) NOT NULL
  ) DEFAULT CHARSET=UTF8;`);

connection.query(`CREATE TABLE IF NOT EXISTS pedidos (
    id_pedido INT(10) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    estado VARCHAR(45) NOT NULL,
    hora datetime NOT NULL,
    pago_via VARCHAR(45) NOT NULL,
    pago_monto DECIMAL(8,2) NOT NULL,
    observaciones VARCHAR(200),
    id_usuario INT(10) NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
  ) DEFAULT CHARSET=UTF8;`);

connection.query(`CREATE TABLE IF NOT EXISTS detallePedidos (
    id_detallePedido INT(10) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    id_pedido INT(10) NOT NULL,
    id_producto INT(10) NOT NULL,
    cantidad_producto INT(10) NOT NULL,
    FOREIGN KEY(id_pedido) REFERENCES pedidos(id_pedido),
    FOREIGN KEY(id_producto) REFERENCES productos(id_producto)
  ) DEFAULT CHARSET=UTF8;`);
