const Producto = require("../models/producto_model.js");

exports.create = (req, res) => {
  const producto = new Producto({
    name: req.body.name,
    description: req.body.description,
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
