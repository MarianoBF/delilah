const express = require('express');
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs')
const docs = YAML.load('./spec.yaml');

require('dotenv').config();


const app = express();


app.use(express.json())

app.use(express.urlencoded({ extended: true}))

app.use('/docs', swaggerUI.serve, swaggerUI.setup(docs));

app.get("/", (req, res) => {
    res.json({ message: "Servicio operativo" });
  });

require("./app/routes/producto_routes")(app);
require("./app/routes/usuario_routes")(app);
require("./app/routes/pedido_routes")(app);
require("./app/routes/detallePedido_routes")(app);



app.listen(8500, () => {
    console.log("A la espera en 8500")
})


