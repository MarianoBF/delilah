const Producto = require("../models/producto_model");
const chequearToken = require("../middleware/auth")

exports.create = (req, res) => {
  const producto = new Producto({
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    precio: req.body.precio,
  });
  Producto.create(producto, (err, data) => {
    if (err) {
      res.status(500).send(err)
    } else { 
      res.send(data);
    }
    });
};

exports.findAll = (req, res) => {
  if (chequearToken(req.headers['x-access-token'])==="Autorizado") {
  Producto.getAll((err, data)=> {
    if (err) {
      res.status(500).send(err);
    } else { 
      res.send(data)
    }
    })
  } else {
    res.status(403).send("Token inválido")
  }
};

exports.update = (req, res) => {
  const producto = new Producto({
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    precio: req.body.precio,
  });
  const id = req.params.id_producto;
  Producto.update(id, producto, (err, data)=> {
    if (err) {
      res.status(500).send(err);
    } else { 
      res.send(data)
    }
    })
};

exports.delete = (req, res) => {
  const id = req.params.id_producto;
  Producto.delete(id, (err, data)=> {
    if (err) {
      res.status(500).send(err);
    } else { 
      res.send(data)
    }
    })
};