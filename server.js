const express = require('express');
const cors = require("cors");
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const connection = require('./app/models/db');

const docs = YAML.load('./spec.yaml');
require('dotenv').config();

const app = express();

app.use(express.json())

app.use(express.urlencoded({ extended: true}))

const corsOptions = {
  credentials: true,
  origin: ["http://localhost:4200", "https://pedidos456.netlify.app"]
};

app.use(cors(corsOptions));

app.use('/docs', swaggerUI.serve, swaggerUI.setup(docs));

app.use("/", function(req, res, next) {
  const chequearToken = require('./app/middleware/auth')
  console.log("Request to", req.method, req.originalUrl)
  const token = req.rawHeaders.find(item=>item.includes('ey') && item.length > 100)
  const decoded = chequearToken(token)
  if (token) {
    console.log("Chequeando token. Rol:", decoded.rol, '- Resultado: ', decoded.resultado)
  } else {
    console.log("Request sin token")
  }
  next();
})

app.get("/", (req, res) => {
  res.json({ message: "Servicio operativo" });
  });

require("./app/routes/producto_routes")(app);
require("./app/routes/usuario_routes")(app);
require("./app/routes/pedido_routes")(app);
require("./app/routes/detallePedido_routes")(app);

app.listen(process.env.PORT, () => {
    console.log("A la espera en " + process.env.PORT )
})


