const Usuario = require("../models/usuario_model.js");
const jwt = require("jsonwebtoken");
const dbConfig = require("../config/db.config");
const bcrypt = require("bcryptjs");

exports.create = (req, res) => {
  const usuario = new Usuario({
    nombre_usuario: req.body.nombre_usuario,
    password: bcrypt.hashSync(req.body.password, 8),
    nombre_completo: req.body.nombre_completo,
    rol: req.body.rol,
  });
  Usuario.create(usuario, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send("Usuario creado!");
    }
  });
};

exports.login = (req, res) => {
  const usuario = {
    nombre_usuario: req.body.nombre_usuario,
    password: req.body.password,
  };
  Usuario.get(usuario, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      try {
      const passwordOK = bcrypt.compareSync(usuario.password, data[0].password);
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
        res.send("Password incorrecto!!!");
      }
    } catch {
      res.send("Hubo un problema al loguear, revise los datos y vuelva a intentar en un momento")
    } 
    }
  });
};

exports.findAll = (req, res) => {
  const validacion = chequearToken(req.headers['x-access-token'])
  if (
    validacion.resultado === "Autorizado" &&
    validacion.rol === "Administrador"
  ) {
  Usuario.getAll((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(data);
    }
  });
} else {
  res.status(403).send("No está autorizado a listar usuarios");
}
};

exports.update = (req, res) => {
  const validacion = chequearToken(req.headers['x-access-token'])
  if (
    validacion.resultado === "Autorizado" &&
    (validacion.rol === "Administrador" ||
      validacion.nombre_usuario === req.body.nombre_usuario) // Admin puede modificar todos, o cada usuario sus propios datos
  ) {
    const usuario = new Usuario({
      nombre_usuario: req.body.nombre_usuario,
      password: req.body.password,
      nombre_completo: req.body.nombre_completo,
      rol: req.body.rol,
    });
    const id = req.params.id_usuario;
    Usuario.update(id, usuario, (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(data);
      }
    });
  } else {
    res.status(403).send("No está autorizado a editar ese usuario");
  }
};

exports.delete = (req, res) => {
  const validacion = chequearToken(req.headers['x-access-token'])
  if (
    validacion.resultado === "Autorizado" &&
    validacion.rol === "Administrador"
  ) {
    const id = req.params.id_usuario;
    Usuario.delete(id, (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(data);
      }
    });
  } else {
    res.status(403).send("No está autorizado a borrar usuarios");
  }
};
