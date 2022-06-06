const Producto = require("../models/producto_model");
const chequearToken = require("../middleware/auth");

exports.create = (req, res) => {
  try {
  const validacion = chequearToken(req.headers["x-access-token"]);
  if (validacion.rol === "administrador") {
    const producto = new Producto({
      nombre: req.body.nombre || '',
      descripcion: req.body.descripcion || '',
      precio: req.body.precio || 0,
      imagen: req.body.imagen || '',
    });
    Producto.create(producto, (err, data) => {
      if (err) {
        res.status(500).send("Error al procesar, posiblemente ya existe un producto con ese nombre");
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
  } else if (req.headers["x-access-token"] === 'visitor') {
    Producto.getAll((err, data) => {
      if (err) {
        res.status(500).send("Error al procesar");
      } else {
        res.send(data);
      }
    });  } else {
    res.status(401).send("Token inválido");
  } } catch {
    res.status(400).send("Hubo un problema, revise los datos y reintente");
  }
};

exports.findOne = (req, res) => {
  try {
  if (chequearToken(req.headers["x-access-token"]).resultado === "Autorizado") {
    const id = req.params.id_producto;
    Producto.getByID(id, (err, data) => {
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
  if (validacion.rol === "administrador") {
    const producto = new Producto({
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      precio: req.body.precio,
      imagen: req.body.imagen,
    });
    const id = req.params.id_producto;
    Producto.update(id, producto, (err, data) => {
      if (data.errno) {
        res.status(500).send("Error al procesar, reintente más adelante y/o con otros datos");
      } else if (data.affectedRows === 0) {
        res.status(500).send("No se pudo actualizar, revise los datos ingresados");  
      }
      else {
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
  if (validacion.rol === "administrador") {
    const id = req.params.id_producto;
    Producto.delete(id, (err, data) => {
      if (data.errno) {
        res.status(500).send("Error al procesar borrado, probablmente el producto existe en uno o más pedidos.");
      } else {
        res.status(204).send();
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
