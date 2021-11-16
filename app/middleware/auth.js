const jwt = require("jsonwebtoken");
const dbConfig = require("../config/db.config");

chequearToken = (token) => {
  let validacion;
  if (!token) {
    validacion = "No se incluyó un token!";
    }

  jwt.verify(token, dbConfig.SECRETO, (err, decoded) => {
    if (err) {
        validacion =  "Token inválido";
        // console.log(decoded)
    } else {
        decoded.resultado = "Autorizado";
        validacion = decoded;
        // console.log(decoded)
    }
  });
  return validacion
};

module.exports = chequearToken;