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

//Devolver todos los productos bajo el pedido

PedidoProd.getAll = (id, result) => {
    sql.query("SELECT * FROM pedidos AS pe INNER JOIN detallePedidos AS dp ON pe.id_pedido = dp.id_pedido WHERE pe.id_pedido = "+id+";", (err, res) => {
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


PedidoProd.update = (id, pedidoProd, result) => {
    sql.query(
      `UPDATE detallePedidos SET id_pedido = ${pedidoProd.id_pedido}, id_producto = ${pedidoProd.id_producto}, cantidad_producto =  ${pedidoProd.cantidad_producto}  WHERE detalle_pedido_id=${id};`,
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
        result(null, res, pedidoProd);
        return;
      }
    );
  };
  
  PedidoProd.delete = (id, result) => {
      sql.query(
        `DELETE FROM detallePedidos WHERE detalle_pedido_id=${id};`,
        (err, res) => {
          if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
          }
          result(`Pedido Producto ${id} borrado`);
          return;
        }
      );
    };

module.exports = PedidoProd;