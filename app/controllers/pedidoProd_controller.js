const PedidoProd = require("../models/pedidoProd_model.js");

exports.create = (req, res) => {
    const pedidoProd = new PedidoProd({
      id_pedido: req.body.id_pedido,
      id_producto: req.body.id_producto,
      cantidad_producto: req.body.cantidad_producto,
    });
  PedidoProd.create(pedidoProd, (err, data) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.send(data);
    }
    });
  };
  
exports.findAll = (req, res) => {
    PedidoProd.getAll((err, data)=> {
    if (err) {
        res.status(500).send(err);
    } else { 
        res.send(data)
    }
    })
};

