const sql = require("./db");

const Producto = function (producto) {
  this.nombre = producto.nombre;
  this.descripcion = producto.descripcion;
  this.precio = producto.precio;
  this.imagen = producto.imagen;
};

Producto.create = (newProducto, result) => {
  sql.query("INSERT INTO productos SET ?", newProducto, (err, res) => {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    }
    result(null, { id: res.insertId, ...newProducto });
  });
};

Producto.getAll = (result) => {
  sql.query("SELECT * FROM productos", (err, res) => {
    if (err) {
      console.log(err);
      result(null, err);
      return;
    }
    result(null, res);
    return;
  });
};

Producto.getByID = (id, result) => {
  sql.query(`SELECT * FROM productos WHERE id_producto=${id}`, (err, res) => {
    if (err) {
      console.log(err);
      result(null, err);
      return;
    }
    result(null, res);
    return;
  });
};

Producto.update = (id, updateProd, result) => {
  sql.query(
    `UPDATE productos SET nombre = '${updateProd.nombre}', precio = ${updateProd.precio}, descripcion =  '${updateProd.descripcion}', imagen = '${updateProd.imagen}'  WHERE id_producto=${id};`,
    (err, res) => {
      if (res.affectedRows === 0) {
        console.log("no match!");
        result(null, res);
        return;
      }
      if (err) {
        console.log(err);
        result(null, err);
        return;
      }
      result(null, {...updateProd});
      return;
    }
  );
};

Producto.delete = (id, result) => {
    sql.query(
      `DELETE FROM productos WHERE id_producto=${id};`,
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

module.exports = Producto;
