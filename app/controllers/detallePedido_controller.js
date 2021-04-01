const DetallePedido = require("../models/detallePedido_model.js");

exports.create = (req, res) => {
  const validacion = chequearToken(req.headers["x-access-token"]);
  if (
    validacion.resultado === "Autorizado" &&
    validacion.id_usuario === +req.body.id_usuario
  ) {
    const detallePedido = new DetallePedido({
      id_pedido: req.body.id_pedido,
      id_producto: req.body.id_producto,
      cantidad_producto: req.body.cantidad_producto,
    });
    DetallePedido.create(detallePedido, (err, data) => {
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
    const detallePedido = new DetallePedido({
      id_pedido: req.body.id_pedido,
      id_producto: req.body.id_producto,
      cantidad_producto: req.body.cantidad_producto,
    });
    DetallePedido.create(detallePedido, (err, data) => {
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
    const id = req.query.id_pedido;
    DetallePedido.getAll(id, (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(data);
      }
    });
  } else {
    res.status(403).send("No está autorizado a ver este listado");
  }
};

exports.update = (req, res) => {  ///********************* */
  if (isNaN(+req.body.cantidad_producto)) {
    console.log("aa")
  }
  const validacion = chequearToken(req.headers["x-access-token"]);
  if (
    validacion.resultado === "Autorizado" &&
    validacion.id_usuario === +req.body.id_usuario
  ) { 
    const detallePedido = new DetallePedido({ //Sólo se puede modificar producto o cantidad, no el pedido al que enlaza.
      id_producto: req.body.id_producto,
      cantidad_producto: req.body.cantidad_producto,
    });
    const id = req.params.id_pedidoProducto;
    DetallePedido.update(id, detallePedido, (err, data) => {
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
    const detallePedido = new DetallePedido({
      id_pedido: req.body.id_pedido,
      id_producto: req.body.id_producto,
      cantidad_producto: req.body.cantidad_producto,
    });
    const id = req.params.id_pedidoProducto;
    DetallePedido.update(id, detallePedido, (err, data) => {
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

exports.delete = (req, res) => {
  if (
    validacion.resultado === "Autorizado" &&
    validacion.id_usuario === +req.body.id_usuario
  ) {
    const id = req.params.id_pedidoProducto;
    DetallePedido.delete(id, (err, data) => {
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
    const id = req.params.id_pedidoProducto;
    DetallePedido.delete(id, (err, data) => {
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
