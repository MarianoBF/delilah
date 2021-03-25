module.exports = app => {

    const router = require("express").Router();
    
    const pedidoProd = require("../controllers/pedidoProd_controller.js")

    router.get("/pedidoProds", pedidoProd.findAll)

    router.post("/pedidoProd", pedidoProd.create)

    app.use("/api/", router)

    }
