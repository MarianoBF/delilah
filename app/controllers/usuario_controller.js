const Usuario = require("../models/usuario_model.js");

exports.create = (req, res) => {
  const usuario = new Usuario({
    nombre_usuario: req.body.nombre_usuario,
    password: req.body.password,
    nombre_completo: req.body.nombre_completo,
  });
  Usuario.create(usuario, (err, data) => {
    if (err) {
      res.status(500).send(err)
    } else { 
      res.send(data);
    }
    });
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
