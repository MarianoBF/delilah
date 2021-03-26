module.exports = app => {

    const router = require("express").Router();
    
    const pedidoProd = require("../controllers/pedidoProd_controller.js")

    router.get("/pedidoProds", pedidoProd.findAll)

    router.post("/pedidoProd", pedidoProd.create)

    router.put("/pedidoProd", pedidoProd.update)

    router.delete("/pedidoProd", pedidoProd.delete)

    app.use("/api/", router)

    }
