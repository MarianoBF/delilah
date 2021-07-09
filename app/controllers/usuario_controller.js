const Usuario = require("../models/usuario_model.js");
const jwt = require("jsonwebtoken");
const dbConfig = require("../config/db.config");
const bcrypt = require("bcryptjs");

exports.create = (req, res) => {
  try {
    const usuario = new Usuario({
      nombre_usuario: req.body.nombre_usuario,
      password: bcrypt.hashSync(req.body.password, 8),
      nombre_completo: req.body.nombre_completo,
      email: req.body.email,
      direccion: req.body.direccion,
      telefono: req.body.telefono,
      rol: "usuario", //todos los usuarios se crean como usuario simple, el Admin les debe elevar privilegios
    });
    Usuario.create(usuario, (err, data) => {
      if (err) {
        res.status(500).send("Error al procesar");
      } else {
        res.send(data);
      }
    });
  } catch {
    res
      .status(400)
      .send(
        "Hubo un problema al crear el usuario, revise los datos y vuelva a intentar en un momento"
      );
  }
};

exports.login = (req, res) => {
  try {
    const usuario = {
      nombre_usuario: req.body.nombre_usuario,
      password: req.body.password,
    };
    Usuario.get(usuario, (err, data) => {
      if (err) {
        res.status(500).send("Error al procesar");
      } else if (data) {
        const passwordOK = bcrypt.compareSync(
          usuario.password,
          data[0].password
        );
        if (passwordOK) {
          const token = jwt.sign(
            {
              rol: data[0].rol,
              nombre_usuario: data[0].nombre_usuario,
              id_usuario: data[0].id_usuario,
            },
            dbConfig.SECRETO,
            { expiresIn: 86400 }
          );
          res.send(token);
        } else {
          res
            .status(400)
            .send(
              "Hubo un problema al loguear, revise los datos y vuelva a intentar en un momento"
            );
        }
      }
    });
  } catch {
    res
      .status(400)
      .send(
        "Hubo un problema al loguear, revise los datos y vuelva a intentar en un momento"
      );
  }
};

exports.findAll = (req, res) => {
  try {
    const validacion = chequearToken(req.headers["x-access-token"]);
    if (validacion.rol === "administrador") {
      Usuario.getAll((err, data) => {
        if (err) {
          res.status(500).send("Error al procesar");
        } else {
          res.send(data);
        }
      });
    } else if (validacion.rol === "usuario") {
      Usuario.getAllFromOne(validacion.id_usuario, (err, data) => {
        if (err) {
          res.status(500).send("Error al procesar");
        } else {
          res.send(data);
        }
      });
    }  else {
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
      if (req.body.rol === "usuario" || req.body.rol === "administrador") {
        const usuario = new Usuario({
          nombre_usuario: req.body.nombre_usuario,
          password: req.body.password,
          nombre_completo: req.body.nombre_completo,
          direccion: req.body.direccion,
          telefono: req.body.telefono,
          rol: req.body.rol,
        });
        const id = req.params.id_usuario;
        Usuario.update(id, usuario, (err, data) => {
          if (err) {
            res.status(500).send("Error al procesar");
          } else {
            res.send(data);
          }
        });
      } else {
        res.status(400).send("Rol no válido");
      }
    } else if (
      validacion.id_usuario === +req.params.id_usuario // Admin puede modificar todos, o cada usuario sus propios datos excepto rol
    ) {
      const usuario = new Usuario({
        nombre_usuario: req.body.nombre_usuario,
        password: req.body.password,
        nombre_completo: req.body.nombre_completo,
        direccion: req.body.direccion,
        telefono: req.body.telefono,
        rol: "usuario",
      });
      const id = req.params.id_usuario;
      Usuario.update(id, usuario, (err, data) => {
        if (err) {
          res.status(500).send("Error al procesar");
        } else {
          res.send(data);
        }
      });
    } else if (validacion.resultado === "Autorizado") {
      res.status(403).send("No está autorizado a editar ese usuario");
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
      const id = req.params.id_usuario;
      Usuario.delete(id, (err, data) => {
        if (err) {
          res
            .status(500)
            .send("Error al procesar, puede tener pedidos asociados");
        } else {
          res.send("Borrado OK");
        }
      });
    } else if (validacion.resultado === "Autorizado") {
      res.status(403).send("No tiene permisos para esta ruta");
    } else {
      res.status(401).send("Token inválido");
    }
  } catch {
    res.status(400).send("Hubo un problema, revise los datos y reintente");
  }
};
