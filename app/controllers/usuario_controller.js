const Usuario = require("../models/usuario_model.js");
const jwt = require("jsonwebtoken");
const config = require("../config/db.config.js");

exports.create = (req, res) => {
  const usuario = new Usuario({
    nombre_usuario: req.body.nombre_usuario,
    password: req.body.password,
    nombre_completo: req.body.nombre_completo,
    rol: req.body.rol
  });
  Usuario.create(usuario, (err, data) => {
    if (err) {
      res.status(500).send(err)
    } else { 
      res.send(data);
    }
    });
};

exports.login = (req, res) => {
  const usuario = req.body.nombre_usuario;
  Usuario.find(usuario, (err, data)=> {
    if (err) {
      res.status(500).send(err);
    } else { 
      // req.body.password === password ? console.log("a") : console.log("b")
      console.log("aaa"+data)
      const token = jwt.sign({ id: usuario.id_usuario }, config.secret, {expiresIn: 86400});
      
      res.send(token)
    }
    })
};

exports.findAll = (req, res) => {
    Usuario.getAll((err, data)=> {
    if (err) {
      res.status(500).send(err);
    } else { 
      res.send(data)
    }
    })
};

exports.update = (req, res) => {
  const usuario = new Usuario({
    nombre_usuario: req.body.nombre_usuario,
    password: req.body.password,
    nombre_completo: req.body.nombre_completo,
    rol: req.body.rol
  });
  const id = req.query.id_usuario;
  Usuario.update(id, usuario, (err, data)=> {
    if (err) {
      res.status(500).send(err);
    } else { 
      res.send(data)
    }
    })
};

exports.delete = (req, res) => {
  const id = req.query.id_usuario;
  Usuario.delete(id, (err, data)=> {
    if (err) {
      res.status(500).send(err);
    } else { 
      res.send(data)
    }
    })
};