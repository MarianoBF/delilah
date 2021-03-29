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
    } else {
        validacion = "Autorizado"; 
    }
  });
  return validacion
};

module.exports = chequearToken;