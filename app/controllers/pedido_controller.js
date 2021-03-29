const Pedido = require("../models/pedido_model.js");
const chequearToken = require("../middleware/auth");

exports.create = (req, res) => {
  const validacion = chequearToken(req.headers["x-access-token"]);
  if (validacion.resultado === "Autorizado") {
    const pedido = new Pedido({
      estado: req.body.estado,
      hora: req.body.hora,
      pago_via: req.body.pago_via,
      pago_monto: req.body.pago_monto,
      id_usuario: req.body.id_usuario,
    });
    Pedido.create(pedido, (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(data);
      }
    });
  } else {
    res.send("No autorizado");
  }
};

exports.findAll = (req, res) => {
  const validacion = chequearToken(req.headers["x-access-token"]);
  if (
    validacion.resultado === "Autorizado" &&
    validacion.rol === "Administrador"
  ) {
    Pedido.getAll((err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(data);
      }
    });
  } else if (
    validacion.resultado === "Autorizado" &&
      validacion.nombre_usuario === req.body.nombre_usuario)
  {
    Pedido.getAllFromOne(validacion.id_usuario, (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(data);
      }
    });
  } 
  
  else {
    res.send("No autorizado");
  }
};

exports.findOne = (req, res) => {
  const validacion = chequearToken(req.headers["x-access-token"]);
  if (
    validacion.resultado === "Autorizado" &&
      validacion.nombre_usuario === req.body.nombre_usuario
  ) {
    const id = req.params.id_pedido;
    Pedido.getOne(validacion.id_usuario, id, (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(data);
      }
    });
  } else if (
    validacion.resultado === "Autorizado" &&
    validacion.rol === "Administrador"
      
  ) {
    const id = req.params.id_pedido;
    Pedido.getOneAdmin(id, (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(data);
      }
    });
  } else {
    res.send("No autorizado");
  }
};

exports.update = (req, res) => {
  const validacion = chequearToken(req.headers["x-access-token"]);
  if (
    validacion.resultado === "Autorizado" &&
    validacion.rol === "Administrador"
  ) { 
    const pedido = new Pedido({ //solo se puede actualizar estado según requerimientos
      estado: req.body.estado,
    });
    const id = req.params.id_pedido;
    Pedido.update(id, pedido, (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(data);
      }
    });
  } else {
    res.status(403).send("No está autorizado a editar pedidos");
  }
};

exports.delete = (req, res) => {
  const validacion = chequearToken(req.headers["x-access-token"]);
  if (
    validacion.resultado === "Autorizado" &&
    validacion.rol === "Administrador"
  ) {
    const id = req.params.id_pedido;
    Pedido.delete(id, (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(data);
      }
    });
  } else {
    res.send("No autorizado a borrar pedidos");
  }
};
