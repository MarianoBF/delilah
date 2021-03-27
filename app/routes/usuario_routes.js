module.exports = app => {

    const router = require("express").Router();
    
    const usuarios = require("../controllers/usuario_controller.js")
    
    router.get("/usuarios", usuarios.findAll);
    
    router.post("/usuario", usuarios.create);

    router.put("/usuario/:id_usuario", usuarios.update);

    router.delete("/usuario/:id_usuario", usuarios.delete);

    app.use("/api/", router)

    }
