const DetallePedido = require("../models/detallePedido_model.js");
const Pedido = require("../models/pedido_model.js");

exports.create = (req, res) => {
  try {
    const validacion = chequearToken(req.headers["x-access-token"]);
    if (validacion.rol === "usuario") {
      const detallePedido = new DetallePedido({
        id_pedido: +req.params.id_pedido,
        id_producto: +req.body.id_producto,
        cantidad_producto: +req.body.cantidad_producto,
      });
      Pedido.getOne(req.params.id_pedido, (err, data) => {
        if (err) {
          res.status(500).send("Error al procesar");
        }
        if (data.length === 0) {
          res.status(500).send("Error al procesar");
        } else {
          if (+data[0].id_usuario !== +validacion.id_usuario) {
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
        id_pedido: req.params.id_pedido,
        id_producto: req.body.id_producto,
        cantidad_producto: req.body.cantidad_producto,
      });
      DetallePedido.create(detallePedido, (err, data) => {
        if (err) {
          res.status(500).send("Error al procesar");
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
    if (validacion.rol === "administrador") {
      DetallePedido.getAll((err, data) => {
        if (err) {
          res.status(500).send("Error al procesar");
        } else {
          res.send(data);
        }
      });
    } else if (validacion.resultado === "Autorizado") {
      res.status(403).send("No tiene permisos para listar todo");
    } else {
      res.status(401).send("Token inválido");
    }
  } catch {
    res.status(400).send("Hubo un problema, revise los datos y reintente");
  }
};

exports.findOne = (req, res) => {
  try {
    const validacion = chequearToken(req.headers["x-access-token"]);
    const id = req.params.id_pedido;
    if (validacion.rol === "usuario") {
      Pedido.getOne(id, (err, data) => {
        if (err) {
          res.status(500).send("Error al procesar");
        } else {
          if (+data[0].id_usuario !== +validacion.id_usuario) {
            res.status(403).send("No tiene permisos para listar este pedido");
          } else {
            DetallePedido.getAllFromOne(id, (err, data2) => {
              if (err) {
                res.status(500).send("Error al procesar");
              } else {
                res.send(data2);
              }
            });
          }
        }
      });
    } else if (validacion.rol === "administrador") {
      const id = req.params.id_pedido;
      DetallePedido.getAllFromOne(id, (err, data) => {
        if (err) {
          res.status(500).send("Error al procesar");
        } else {
          res.send(data);
        }
      });
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
        id_producto: req.body.id_producto,
        cantidad_producto: req.body.cantidad_producto,
      });
      const id = req.params.id_detallePedido;
      DetallePedido.update(id, detallePedido, (err, data) => {
        if (data.errno) {
          res.status(500).send("Error al procesar, chequee los datos y reintente");
        } else if (data.affectedRows === 0) {
          res
            .status(500)
            .send("No se pudo actualizar, revise los datos ingresados");
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
        if (data.errno) {
          res.status(500).send("Error al procesar borrado");
        } else {
          res.status(204).send();
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
