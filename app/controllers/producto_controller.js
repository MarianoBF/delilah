const Producto = require("../models/producto_model");
const chequearToken = require("../middleware/auth");

exports.create = (req, res) => {
  try {
  const validacion = chequearToken(req.headers["x-access-token"]);
  if (validacion.rol === "Administrador") {
    const producto = new Producto({
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      precio: req.body.precio,
    });
    Producto.create(producto, (err, data) => {
      if (err) {
        res.status(500).send("Error al procesar");
      } else {
        res.send(data);
      }
    });
  } else if (validacion.resultado === "Autorizado") {
    res.status(403).send("No tiene permisos para esta ruta");
  } else {
    res.status(401).send("Token inválido");
  } } catch {
    res.status(400).send("Hubo un problema, revise los datos y reintente");
  }
  
};

exports.findAll = (req, res) => {
  try {
  if (chequearToken(req.headers["x-access-token"]).resultado === "Autorizado") {
    Producto.getAll((err, data) => {
      if (err) {
        res.status(500).send("Error al procesar");
      } else {
        res.send(data);
      }
    });
  } else {
    res.status(401).send("Token inválido");
  } } catch {
    res.status(400).send("Hubo un problema, revise los datos y reintente");
  }
};

exports.update = (req, res) => {
  try {
  const validacion = chequearToken(req.headers["x-access-token"]);
  if (validacion.rol === "Administrador") {
    const producto = new Producto({
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      precio: req.body.precio,
    });
    const id = req.params.id_producto;
    Producto.update(id, producto, (err, data) => {
      if (err) {
        res.status(500).send("Error al procesar");
      } else {
        res.send(data);
      }
    });
  } else if (validacion.resultado === "Autorizado") {
    res.status(403).send("No tiene permisos para esta ruta");
  } else {
    res.status(401).send("Token inválido");
  } } catch {
    res.status(400).send("Hubo un problema, revise los datos y reintente");
  }
};

exports.delete = (req, res) => {
  try {
  const validacion = chequearToken(req.headers["x-access-token"]);
  if (validacion.rol === "Administrador") {
    const id = req.params.id_producto;
    Producto.delete(id, (err, data) => {
      if (err) {
        res.status(500).send("Error al procesar");
      } else {
        res.send("Borrado OK");
      }
    });
  } else if (validacion.resultado === "Autorizado") {
    res.status(403).send("No tiene permisos para esta ruta");
  } else {
    res.status(401).send("Token inválido");
  } } catch {
    res.status(400).send("Hubo un problema, revise los datos y reintente");
  }
};
