const DetallePedido = require("../models/detallePedido_model.js");
const Pedido = require("../models/pedido_model.js");

exports.create = (req, res) => {
  try {
    const validacion = chequearToken(req.headers["x-access-token"]);
    if (validacion.id_usuario === +req.body.id_usuario) {
      const detallePedido = new DetallePedido({
        id_pedido: req.body.id_pedido,
        id_producto: req.body.id_producto,
        cantidad_producto: req.body.cantidad_producto,
      });
      Pedido.getOne(validacion.id_usuario, id_pedido, (err, data) => {
        if (err) {
          res.status(500).send("Error al procesar");
        } else {
          if (data.id_usuario !== validacion.id_usuario) {
            res
              .status(403)
              .send("No tiene permisos para agregar en ese pedido");
          } else {
            DetallePedido.create(detallePedido, (err, data) => {
              if (err) {
                res.status(500).send("Error al procesar");
              } else {
                res.send(data);
              }
            });
          }
        }
      });
    } else if (validacion.rol === "administrador") {
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
    } else if (validacion.resultado === "Autorizado") {
      res.status(403).send("No tiene permisos para agregar en ese pedido");
    } else {
      res.status(401).send("Token inválido");
    }
  } catch {
    res.status(400).send("Hubo un problema, revise los datos y reintente");
  }
};

exports.findAll = (req, res) => {
  try {
    const validacion = chequearToken(req.headers["x-access-token"]);
    if (validacion.id_usuario === +req.body.id_usuario) {
      Pedido.getOne(validacion.id_usuario, id_pedido, (err, data) => {
        if (err) {
          res.status(500).send("Error al procesar");
        } else {
          if (data.id_usuario !== validacion.id_usuario) {
            res
              .status(403)
              .send("No tiene permisos para agregar en ese pedido");
          } else {
            const id = req.query.id_pedido;
            DetallePedido.getAll(id, (err, data) => {
              if (err) {
                res.status(500).send("Error al procesar");
              } else {
                res.send(data);
              }
            });
          }
        }
      });
    } else if (validacion.rol === "administrador") {
      const id = req.query.id_pedido;
      DetallePedido.getAll(id, (err, data) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.send(data);
        }
      });
    } else if (validacion.resultado === "Autorizado") {
      res.status(403).send("No tiene permisos para agregar en ese pedido");
    } else {
      res.status(401).send("Token inválido");
    }
  } catch {
    res.status(400).send("Hubo un problema, revise los datos y reintente");
  }
};

exports.update = (req, res) => {
  try {
    const validacion = chequearToken(req.headers["x-access-token"]);
    if (validacion.rol === "administrador") {
      const detallePedido = new DetallePedido({
        id_pedido: req.body.id_pedido,
        id_producto: req.body.id_producto,
        cantidad_producto: req.body.cantidad_producto,
      });
      const id = req.params.id_detallePedido;
      DetallePedido.update(id, detallePedido, (err, data) => {
        if (err) {
          res.status(500).send("Error al procesar");
        } else {
          res.send(data);
        }
      });
    } else if (validacion.resultado === "Autorizado") {
      res.status(403).send("No tiene permisos para editar pedidos");
    } else {
      res.status(401).send("Token inválido");
    }
  } catch {
    res.status(400).send("Hubo un problema, revise los datos y reintente");
  }
};

exports.delete = (req, res) => {
  try {
    const validacion = chequearToken(req.headers["x-access-token"]);
    if (validacion.rol === "administrador") {
      const id = req.params.id_detallePedido;
      DetallePedido.delete(id, (err, data) => {
        if (err) {
          res.status(500).send("Error al procesar");
        } else {
          res.send(data);
        }
      });
    } else if (validacion.resultado === "Autorizado") {
      res.status(403).send("No tiene permisos para editar pedidos");
    } else {
      res.status(401).send("Token inválido");
    }
  } catch {
    res.status(400).send("Hubo un problema, revise los datos y reintente");
  }
};
