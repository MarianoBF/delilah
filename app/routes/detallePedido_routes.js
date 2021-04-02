module.exports = app => {

    const router = require("express").Router();
    
    const detallePedido = require("../controllers/detallePedido_controller.js")

    router.get("/detallePedidos", detallePedido.findAll)

    router.get("/detallePedido/:id_pedido", detallePedido.findOne)

    router.post("/detallePedido/:id_pedido", detallePedido.create)

    router.put("/detallePedido/:id_detallePedido", detallePedido.update)

    router.delete("/detallePedido/:id_detallePedido", detallePedido.delete)

    app.use("/api/v1/", router)

    }
