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
            result(null, err);
            return;
        }
        result(null, {id: res.insertId, ...newDetallePedido})
    });
};

DetallePedido.getAllFromOne = (id, result) => {
  // sql.query("SELECT * FROM pedidos AS pe INNER JOIN detallePedidos AS dp ON pe.id_pedido = dp.id_pedido WHERE pe.id_pedido = "+id+";", (err, res) => {
    sql.query("SELECT * FROM detallePedidos WHERE id_pedido = "+id+";", (err, res) => {
        if (err) {
            console.log(err);
            result(null, res)
            return
        }
        result(null, res)
        return
    })
};

DetallePedido.getAll = (result) => {
  sql.query("SELECT * FROM pedidos AS pe INNER JOIN detallePedidos AS dp ON pe.id_pedido = dp.id_pedido", (err, res) => {
    if (err) {
      console.log(err);
      result(null, err);
      return;
    }
    result(null, res);
    return;
  });
};

DetallePedido.update = (id, detallePedido, result) => {
    sql.query(
      `UPDATE detallePedidos SET id_producto = IF ('${detallePedido.id_producto}'='undefined',id_producto,'${detallePedido.id_producto}'),
       cantidad_producto = IF ('${detallePedido.cantidad_producto}'='undefined',cantidad_producto,'${detallePedido.cantidad_producto}')
       WHERE id_detallePedido=${id};`,
      (err, res) => {
        if (err) {
          console.log(err);
          result(null, err);
          return;
        }
        if (res.affectedRows === 0) {
          console.log("no match!");
          result(null, res);
          return;
        }
        result(null, {id_detallePedido: +id, ...detallePedido});
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
          result(null, res);
          return;
        }
      );
    };

module.exports = DetallePedido;