const { check } = require('express-validator');

module.exports = app => {

    const router = require("express").Router();
    
    const usuarios = require("../controllers/usuario_controller.js")
    
    router.get("/usuarios", usuarios.findAll);

    router.get("/usuarios/checkMail", usuarios.checkMail);
    
    router.post("/usuario/crear", usuarios.create);

    router.put("/usuario/:id_usuario", usuarios.update);

    router.delete("/usuario/:id_usuario", usuarios.delete);

    router.post("/usuario/login",[check('nombre_usuario', 'Nombre es obligatorio').not().isEmpty()], usuarios.login);

    router.get("/usuarios/checkToken", usuarios.checkToken);

    app.use("/api/v1/", router)

    }
