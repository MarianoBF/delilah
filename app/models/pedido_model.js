const sql = require("./db");

const Pedido = function (pedido) {
  this.estado = pedido.estado;
  this.hora = pedido.hora;
  this.pago_via = pedido.pago_via;
  this.pago_monto = pedido.pago_monto;
  this.id_usuario = pedido.id_usuario;
};

Pedido.create = (newPedido, result) => {
  sql.query("INSERT INTO pedidos SET ?", newPedido, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("Pedido cargado: ", { id: res.insertId, ...newPedido });
    result(null, { id: res.insertId, ...newPedido });
  });
};

Pedido.getAll = (result) => {
  sql.query("SELECT * FROM pedidos", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("Pedidos :", res);
    result(null, res);
    return;
  });
};

Pedido.update = (id, updatePedido, result) => {
  sql.query(
    `UPDATE pedidos SET estado = '${updatePedido.estado}', hora = '${updatePedido.hora}', pago_via = '${updatePedido.pago_via}', pago_monto =  ${updatePedido.pago_monto}, id_usuario =  ${updatePedido.id_usuario}  WHERE id_pedido=${id};`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("productos :", res);
      result(null, res, updatePedido);
      return;
    }
  );
};

Pedido.delete = (id, result) => {
  sql.query(`DELETE FROM pedidos WHERE id_pedido=${id};`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("productos :", res);
    result(`Pedido ${id} borrado`);
    return;
  });
};

module.exports = Pedido;
