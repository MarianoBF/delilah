const sql = require("./db");

const Usuario = function(usuario) {
    this.nombre_usuario = usuario.nombre_usuario;
    this.password = usuario.password;
    this.nombre_completo = usuario.nombre_completo;
}

Usuario.create = (newUsuario, result) => {
    sql.query("INSERT INTO usuarios SET ?", newUsuario, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("Usuario cargado: ", {id: res.insertId, ...newUsuario});
        result(null, {id: res.insertId, ...newUsuario})
    });
};


Usuario.getAll = result => {
    sql.query("SELECT * FROM usuarios", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return
        }
        console.log("Usuarios :", res);
        result(null, res)
        return
    });
};

module.exports = Usuario;