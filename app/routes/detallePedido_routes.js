module.exports = app => {

    const router = require("express").Router();
    
    const detallePedido = require("../controllers/detallePedido_controller.js")

    router.get("/detallePedidos", detallePedido.findAll)

    router.post("/detallePedido", detallePedido.create)

    router.put("/detallePedido/:id_detallePedido", detallePedido.update)

    router.delete("/detallePedido/:id_detallePedido", detallePedido.delete)

    app.use("/api/", router)

    }
