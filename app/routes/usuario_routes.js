module.exports = app => {

    const router = require("express").Router();
    
    const usuarios = require("../controllers/usuario_controller.js")
    
    router.get("/usuarios", usuarios.findAll);
    
    router.post("/usuario/crear", usuarios.create);

    router.put("/usuario/:id_usuario", usuarios.update);

    router.delete("/usuario/:id_usuario", usuarios.delete);

    router.post("/usuario/login", usuarios.login);

    app.use("/api/v1/", router)

    }
