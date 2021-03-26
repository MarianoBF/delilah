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
    const id = req.query.id_pedido
    PedidoProd.getAll(id, (err, data)=> {
    if (err) {
        res.status(500).send(err);
    } else { 
        res.send(data)
    }
    })
};

exports.update = (req, res) => {
  const pedidoProd = new PedidoProd({
    id_pedido: req.body.id_pedido,
    id_producto: req.body.id_producto,
    cantidad_producto: req.body.cantidad_producto,
  });
  const id = req.query.id_pedidoProducto;
  PedidoProd.update(id, pedidoProd, (err, data)=> {
    if (err) {
      res.status(500).send(err);
    } else { 
      res.send(data)
    }
    })
};

exports.delete = (req, res) => {
  const id = req.query.id_pedidoProducto;
  PedidoProd.delete(id, (err, data)=> {
    if (err) {
      res.status(500).send(err);
    } else { 
      res.send(data)
    }
    })
};