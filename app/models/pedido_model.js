const sql = require("./db");

const Pedido = function (pedido) {
  this.estado = pedido.estado;
  this.pago_via = pedido.pago_via;
  this.pago_monto = pedido.pago_monto;
  this.id_usuario = pedido.id_usuario;
  this.observaciones = pedido.observaciones || "";
};

Pedido.create = (newPedido, result) => {
  const { estado, hora, pago_via, pago_monto, id_usuario, observaciones } =
    newPedido;
  sql.query(
    `INSERT INTO pedidos (estado, hora, pago_via, pago_monto, observaciones, id_usuario) VALUES ('${estado}', CURRENT_TIMESTAMP, '${pago_via}', ${pago_monto}, '${observaciones}', ${id_usuario})`,
    (err, res) => {
      if (err) {
        console.log(err);
        result(err, null);
        return;
      }
      result(null, { id_pedido: res.insertId, ...newPedido });
    }
  );
};

Pedido.getAll = (result) => {
  sql.query("SELECT * FROM pedidos WHERE borrado = 0", (err, res) => {
    if (err) {
      console.log(err);
      result(null, err);
      return;
    }
    result(null, res);
    return;
  });
};

Pedido.getAllFromOne = (id, result) => {
  sql.query(
    `SELECT * FROM pedidos WHERE id_usuario=${id} AND borrado = 0`,
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

Pedido.getOne = (id_pedido, result) => {
  sql.query(
    `SELECT * FROM pedidos WHERE id_pedido=${id_pedido} AND borrado = 0;`,
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

Pedido.update = (id, estado, result) => {
  sql.query(
    `UPDATE pedidos SET estado = '${estado}' WHERE id_pedido=${id} AND borrado = 0;`,
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
      result(null, { estado: estado });
      return;
    }
  );
};

Pedido.updateObs = (id, observaciones, result) => {
  sql.query(
    `UPDATE pedidos SET observaciones = '${observaciones}' WHERE id_pedido=${id} AND borrado = 0;`,
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
      result(null, { observaciones: observaciones });
      return;
    }
  );
};

Pedido.updateAmo = (id, pago_monto, result) => {
  sql.query(
    `UPDATE pedidos SET pago_monto = '${pago_monto}' WHERE id_pedido=${id} AND borrado = 0;`,
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
      result(null, { pago_monto: pago_monto });
      return;
    }
  );
};

Pedido.delete = (id, result) => {
  sql.query(
    `UPDATE pedidos SET borrado = 1 WHERE id_producto=${id};`,
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

module.exports = Pedido;
