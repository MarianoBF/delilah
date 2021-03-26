module.exports = app => {

    const router = require("express").Router();
    
    const usuarios = require("../controllers/usuario_controller.js")
    
    router.get("/usuarios", usuarios.findAll);
    
    router.post("/usuario", usuarios.create);

    router.put("/usuario", usuarios.update);

    router.delete("/usuario", usuarios.delete);

    app.use("/api/", router)

    }
