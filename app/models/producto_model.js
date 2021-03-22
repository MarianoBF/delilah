const sql = require("./db");

const Producto = function(producto) {
    this.name = producto.name;
    this.description = producto.description;
}

Producto.create = (newProducto, result) => {
    sql.query("INSERT INTO products SET ?", newProducto, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("producto cargado: ", {id: res.insertId, ...newProducto});
        result(null, {id: res.insertId, ...newProducto})
    });
};


Producto.getAll = result => {
    sql.query("SELECT * FROM products", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return
        }
        console.log("productos :", res);
        result(null, res)
        return
    });
};

module.exports = Producto;