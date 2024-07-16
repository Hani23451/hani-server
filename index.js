const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const path = require("path");
const DB = require("./config/DB.config");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swager");

// Middleware
app.use(express.static(path.join(__dirname, "images")));
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Swagger setup
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Example route
/**
 * @swagger
 * /:
 *   get:
 *     summary: Welcome message
 *     responses:
 *       200:
 *         description: return hello world   .
 */
app.get("/", (req, res) => {
  res.send("Hello World!");
});


app.use("/auth", require("./routes/auth"));



DB.then((con) => {
  app.listen(process.env.PORT || 8080, () => {
    console.log(
      "Listening On " +
        (process.env.PORT || 8080) +
        " DB Connect To " +
        con.connection.host
    );
    console.log(
      "DB Connected at " + "http://localhost:" + (process.env.PORT || 8080)
    );
  });
}).catch((err) => {
  throw new Error(
    "Error Happened While Connecting TO DataBase\n" + err.message,
    err.status
  );
});

module.exports = app;
