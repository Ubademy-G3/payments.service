const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const payments = require("./infrastructure/routes/payments");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", payments);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.serviceLocator = require("./infrastructure/config/ServiceLocator");

module.exports = app;
