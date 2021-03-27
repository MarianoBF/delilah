module.exports = app => {

    const router = require("express").Router();
    
    const pedidoProd = require("../controllers/pedidoProd_controller.js")

    router.get("/pedidoProds", pedidoProd.findAll)

    router.post("/pedidoProd", pedidoProd.create)

    router.put("/pedidoProd/:id_detallePedido", pedidoProd.update)

    router.delete("/pedidoProd/:id_detallePedido", pedidoProd.delete)

    app.use("/api/", router)

    }
