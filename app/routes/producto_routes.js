module.exports = app => {

    const router = require("express").Router();
    
    const productos = require("../controllers/producto_controller.js")
    
    router.get("/a", productos.findAll);
    
    router.post("/addProduct", productos.create)
    
    // router.update("/product/:id", productos.update)
    
    // router.delete("a", productos.delete)
    

    app.use("/api/", router)

    }
