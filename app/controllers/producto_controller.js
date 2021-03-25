const Producto = require("../models/producto_model.js");

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
  Producto.getAll((err, data)=> {
    if (err) {
      res.status(500).send(err);
    } else { 
      res.send(data)
    }
    })
};

exports.update = (req, res) => {
  const producto = new Producto({
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    precio: req.body.precio,
  });
  const id = req.query.id_producto;
  Producto.actual(id, producto, (err, data)=> {
    if (err) {
      res.status(500).send(err);
    } else { 
      res.send(data)
    }
    })
};

exports.delete = (req, res) => {
  const id = req.query.id_producto;
  Producto.delete(id, (err, data)=> {
    if (err) {
      res.status(500).send(err);
    } else { 
      res.send(data)
    }
    })
};