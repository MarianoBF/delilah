const Pedido = require("../models/pedido_model.js");

exports.create = (req, res) => {
  const pedido = new Pedido({
    estado: req.body.estado,
    hora: req.body.hora,
    pago_via: req.body.pago_via,
    pago_monto: req.body.pago_monto,
    usuario: req.body.usuario,
    productos: req.body.productos,
  });
  Pedido.create(pedido, (err, data) => {
    if (err) {
      res.status(500).send(err)
    } else { 
      res.send(data);
    }
    });
};

exports.findAll = (req, res) => {
    Pedido.getAll((err, data)=> {
    if (err) {
      res.status(500).send(err);
    } else { 
      res.send(data)
    }
    })
};
