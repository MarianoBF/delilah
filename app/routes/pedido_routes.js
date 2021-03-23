module.exports = app => {

    const router = require("express").Router();
    
    const pedidos = require("../controllers/pedido_controller.js")
    
    router.get("/pedidos", pedidos.findAll);
    
    router.post("/pedido", pedidos.create)

    app.use("/api/", router)

    }
