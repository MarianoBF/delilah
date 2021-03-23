module.exports = app => {

    const router = require("express").Router();
    
    const productos = require("../controllers/producto_controller.js")
    
    router.get("/productos", productos.findAll);
    
    router.post("/producto", productos.create)
    
    // router.update("/product/:id", productos.update)
    
    // router.delete("a", productos.delete)
    

    app.use("/api/", router)

    }
