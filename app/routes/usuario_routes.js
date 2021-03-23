module.exports = app => {

    const router = require("express").Router();
    
    const usuarios = require("../controllers/usuario_controller.js")
    
    router.get("/usuarios", usuarios.findAll);
    
    router.post("/usuario", usuarios.create)

    app.use("/api/", router)

    }
