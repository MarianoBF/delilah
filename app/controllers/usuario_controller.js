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
      rol: "administrador", //usuarios se crean como admin
    });
    Usuario.create(usuario, (err, data) => {
      if (err) {
        res
          .status(500)
          .send(
            "Error al procesar, probable nombre de usuario, nombre completo o email duplicado. "
          );
      } else {
        res
        .status(200)
        .send({
          message: "Usuario creado",
          nombre_usuario: data.nombre_usuario,
          id_usuario: data.id,
          email: data.email,
        });
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
    };
    Usuario.get(usuario, (err, data) => {
      if (err) {
        res.status(500).send("Error al procesar");
      } else if (data.length > 0) {
        const passwordOK = bcrypt.compareSync(
          req.body.password,
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
          res.status(200).send({ token: token });
        } else {
          res
            .status(400)
            .send(
              "Hubo un problema al loguear, revise los datos y vuelva a intentar en un momento"
            );
        }
      } else {
        res
          .status(400)
          .send(
            "Hubo un problema al loguear, revise los datos y vuelva a intentar en un momento"
          );
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
          datos = data.map((usuario) => {
            return {
              id_usuario: usuario.id_usuario,
              nombre_usuario: usuario.nombre_usuario,
              nombre_completo: usuario.nombre_completo,
              email: usuario.email,
              direccion: usuario.direccion,
              telefono: usuario.telefono,
              rol: usuario.rol,
            };
          });
          res.send({ datos });
        }
      });
    } else if (validacion.rol === "usuario") {
      Usuario.getAllFromOne(validacion.id_usuario, (err, data) => {
        if (err) {
          res.status(500).send("Error al procesar");
        } else {
          res.send({
            nombre_usuario: data.nombre_usuario,
            nombre_completo: data.nombre_completo,
            email: data.email,
            direccion: data.direccion,
            telefono: data.telefono,
            rol: data.rol,
          });
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
      if (req.body.rol === "usuario" || req.body.rol === "administrador") {
          const usuario = new Usuario({
            nombre_usuario: req.body.nombre_usuario,
            nombre_completo: req.body.nombre_completo,
            password: req.body.password,
            email: req.body.email,
            direccion: req.body.direccion,
            telefono: req.body.telefono,
            rol: req.body.rol,
          });
          const id = req.params.id_usuario;
          Usuario.update(id, usuario, (err, data) => {
            if (data.errno) {
              res.status(500).send("Error al procesar, reintente más adelante y/o con otros datos");
            } else if (data.affectedRows === 0) {
              res
                .status(500)
                .send("No se pudo actualizar, revise los datos ingresados");
            } else {
              res.send({
                message: "Usuario actualizado",
                id_usuario: data.id_usuario,
                nombre_usuario: data.nombre_usuario,
                nombre_completo: data.nombre_completo,
                direccion: data.direccion,
                telefono: data.telefono,
                rol: data.rol,
                email: data.email,
              });
            }
          ;
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
        email: req.body.email,
      });
      const id = req.params.id_usuario;
      Usuario.update(id, usuario, (err, data) => {
        if (data.errno) {
          res.status(500).send("Error al procesar, reintente más adelante y/o con otros datos");
        } else if (data.affectedRows === 0) {
          res
            .status(500)
            .send("No se pudo actualizar, revise los datos ingresados");
        } else {
          res.send({
            message: "Usuario actualizado",
            id_usuario: data.id_usuario,
            nombre_usuario: data.nombre_usuario,
            nombre_completo: data.nombre_completo,
            direccion: data.direccion,
            telefono: data.telefono,
            rol: data.rol,
            email: data.email,
          });
        }
      });
    } else if (validacion.resultado === "Autorizado") {
      res.status(403).send("No está autorizado a editar ese usuario");
    } else {
      res.status(401).send("Token inválido");
    }
  } catch (error) {
    console.log("error", error)
    res.status(400).send("Hubo un problema, revise los datos y reintente");
  }
};

exports.delete = (req, res) => {
  try {
    const validacion = chequearToken(req.headers["x-access-token"]);
    if (validacion.rol === "administrador") {
      const id = req.params.id_usuario;
      Usuario.delete(id, (err, data) => {
        if (data.errno) {
          res
            .status(500)
            .send("Error al procesar, puede tener pedidos asociados");
        } else {
          res.status(204).send();
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
