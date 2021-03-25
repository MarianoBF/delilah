const sql = require("./db");

const PedidoProd = function(pedidoProd) {
    this.id_pedido = pedidoProd.id_pedido;
    this.id_producto = pedidoProd.id_producto;
    this.cantidad_producto = pedidoProd.cantidad_producto;
}

PedidoProd.create = (newPedidoProd, result) => {
    sql.query("INSERT INTO detallePedidos SET ?", newPedidoProd, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("Pedido cargado: ", {id: res.insertId, ...newPedidoProd});
        result(null, {id: res.insertId, ...newPedidoProd})
    });
};


PedidoProd.getAll = result => {
    sql.query("SELECT * FROM detallePedidos", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, res)
            return
        }
        console.log("Detalle: ", res)
        result(null, res)
        return
    })
};

module.exports = PedidoProd;