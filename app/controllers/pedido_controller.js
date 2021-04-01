const Pedido = require("../models/pedido_model.js");
const chequearToken = require("../middleware/auth");

const ESTADOSPOSIBLES = [
  "nuevo",
  "confirmado",
  "preparado",
  "enviando",
  "cancelado",
  "entregado",
];

exports.create = (req, res) => {
  try {
    const validacion = chequearToken(req.headers["x-access-token"]);
    if (validacion.resultado === "Autorizado") {
      const pedido = new Pedido({
        estado: "nuevo", //Todos los pedidos se crean obligatoriamente con estado nuevo, el Admin debe modificarlo luego
        hora: req.body.hora,
        pago_via: req.body.pago_via,
        pago_monto: req.body.pago_monto,
        id_usuario: req.body.id_usuario,
      });
      Pedido.create(pedido, (err, data) => {
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

exports.findAll = (req, res) => {
  try {
    const validacion = chequearToken(req.headers["x-access-token"]);
    if (validacion.rol === "Administrador") {
      Pedido.getAll((err, data) => {
        if (err) {
          res.status(500).send("Error al procesar");
        } else {
          res.send(data);
        }
      });
    } else if (validacion.nombre_usuario === req.body.nombre_usuario) {
      Pedido.getAllFromOne(validacion.id_usuario, (err, data) => {
        if (err) {
          res.status(500).send("Error al procesar");
        } else {
          res.send(data);
        }
      });
    } else if (validacion.resultado === "Autorizado") {
      res
        .status(403)
        .send("No tiene permisos para ver los pedidos del usuario");
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
    if (validacion.nombre_usuario === req.body.nombre_usuario) {
      const id = req.params.id_pedido;
      Pedido.getOne(validacion.id_usuario, id, (err, data) => {
        if (err) {
          res.status(500).send("Error al procesar");
        } else {
          res.send(data);
        }
      });
    } else if (validacion.rol === "Administrador") {
      const id = req.params.id_pedido;
      Pedido.getOneAdmin(id, (err, data) => {
        if (err) {
          res.status(500).send("Error al procesar");
        } else {
          res.send(data);
        }
      });
    } else if (validacion.resultado === "Autorizado") {
      res.status(403).send("No tiene permisos para ver ese pedido");
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
    if (validacion.rol === "Administrador") {
      if (ESTADOSPOSIBLES.includes(req.body.estado.toLowerCase())) {
        const pedido = new Pedido({
          //solo se puede actualizar estado según requerimientos
          estado: req.body.estado,
        });
        const id = req.params.id_pedido;
        Pedido.update(id, pedido, (err, data) => {
          if (err) {
            res.status(500).send("Error al procesar");
          } else {
            res.send(data);
          }
        });
      } else {
        res.status(400).send("Estado de pedido enviado no es válido");
      }
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
    if (validacion.rol === "Administrador") {
      const id = req.params.id_pedido;
      Pedido.delete(id, (err, data) => {
        if (err) {
          res.status(500).send("Error al procesar");
        } else {
          res.send("Borrado");
        }
      });
    } else if (validacion.resultado === "Autorizado") {
      res.status(403).send("No tiene permisos para borrar pedidos");
    } else {
      res.status(401).send("Token inválido");
    }
  } catch {
    res.status(400).send("Hubo un problema, revise los datos y reintente");
  }
};
