module.exports = app => {

    const router = require("express").Router();
    
    const productos = require("../controllers/producto_controller.js")
    
    router.get("/productos", productos.findAll);
    
    router.post("/producto", productos.create);
    
    router.put("/producto/", productos.update);
    
    // router.delete("/producto/:id", productos.delete)
    

    app.use("/api/", router)

    }
