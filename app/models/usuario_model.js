const sql = require("./db");

const Usuario = function (usuario) {
  this.nombre_usuario = usuario.nombre_usuario;
  this.password = usuario.password;
  this.nombre_completo = usuario.nombre_completo;
  this.email = usuario.email;
  this.rol = usuario.rol;
  this.direccion = usuario.direccion;
  this.telefono = usuario.telefono;
};

Usuario.create = (newUsuario, result) => {
  sql.query("INSERT INTO usuarios SET ?", newUsuario, (err, res) => {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    }
    result(null, { id: res.insertId, ...newUsuario });
  });
};

Usuario.getAll = (result) => {
  sql.query("SELECT * FROM usuarios", (err, res) => {
    if (err) {
      console.log(err);
      result(null, err);
      return;
    }
    result(null, res);
    return;
  });
};

Usuario.update = (id, updateUsuario, result) => {
  sql.query(
    `UPDATE usuarios SET nombre_usuario = IF ('${updateUsuario.nombre_usuario}'='undefined',nombre_usuario,'${updateUsuario.nombre_usuario}'), 
    nombre_completo = IF ('${updateUsuario.nombre_completo}'='undefined',nombre_completo,'${updateUsuario.nombre_completo}'),
    telefono = IF ('${updateUsuario.telefono}'='undefined',telefono,'${updateUsuario.telefono}'),
    direccion = IF ('${updateUsuario.direccion}'='undefined',direccion,'${updateUsuario.direccion}'),
    password = IF ('${updateUsuario.password}'='undefined',password,'${updateUsuario.password}'),
    email = IF ('${updateUsuario.email}'='undefined',email,'${updateUsuario.email}'),
    nombre_usuario = IF ('${updateUsuario.nombre_usuario}'='undefined',nombre_usuario,'${updateUsuario.nombre_usuario}'),
    rol = '${updateUsuario.rol}' WHERE id_usuario=${id};`,
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
      result(null, { id: id, ...updateUsuario });
      return;
    }
  );
};

Usuario.delete = (id, result) => {
  sql.query(`DELETE FROM usuarios WHERE id_usuario=${id};`, (err, res) => {
    if (err) {
      console.log(err);
      result(null, err);
      return;
    }
    result(null, `Usuario ${id} borrado`);
    return;
  });
};

Usuario.get = (usuario, result) => {
  sql.query(
    "SELECT * FROM usuarios WHERE nombre_usuario='" +
      usuario.nombre_usuario +
      "';",
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

Usuario.getByEmail = (email, result) => {
  sql.query(
    "SELECT * FROM usuarios WHERE email='" +
      email +
      "';",
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

Usuario.getAllFromOne = (id, result) => {
  sql.query(
    "SELECT * FROM usuarios WHERE id_usuario='" + id + "';",
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

module.exports = Usuario;
