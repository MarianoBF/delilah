const sql = require("./db");

const DetallePedido = function(detallePedido) {
    this.id_pedido = detallePedido.id_pedido;
    this.id_producto = detallePedido.id_producto;
    this.cantidad_producto = detallePedido.cantidad_producto;
}

DetallePedido.create = (newDetallePedido, result) => {
    sql.query("INSERT INTO detallePedidos SET ?", newDetallePedido, (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        result(null, {id: res.insertId, ...newDetallePedido})
    });
};

//Devolver todos los productos bajo el pedido

DetallePedido.getAll = (id, result) => {
    sql.query("SELECT * FROM pedidos AS pe INNER JOIN detallePedidos AS dp ON pe.id_pedido = dp.id_pedido WHERE pe.id_pedido = "+id+";", (err, res) => {
        if (err) {
            console.log(err);
            result(null, res)
            return
        }
        result(null, res)
        return
    })
};


DetallePedido.update = (id, detallePedido, result) => {
    sql.query(
      `UPDATE detallePedidos SET id_pedido = ${detallePedido.id_pedido}, id_producto = ${detallePedido.id_producto}, cantidad_producto =  ${detallePedido.cantidad_producto}  WHERE detalle_pedido_id=${id};`,
      (err, res) => {
        if (err) {
          console.log(err);
          result(null, err);
          return;
        }
        result(null, res, detallePedido);
        return;
      }
    );
  };
  
  DetallePedido.delete = (id, result) => {
      sql.query(
        `DELETE FROM detallePedidos WHERE detalle_pedido_id=${id};`,
        (err, res) => {
          if (err) {
            console.log(err);
            result(null, err);
            return;
          }
          result(`Pedido Producto ${id} borrado`);
          return;
        }
      );
    };

module.exports = DetallePedido;