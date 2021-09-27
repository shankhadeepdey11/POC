const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");

const routes = require("./routes/routes");
const home = require("./routes/home");

const app = express();

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("tiny"));
app.use("/", home);
app.use("/genres", routes);

//Server
const PORT = 3000;
app.listen(PORT, () => console.log("Server running"));
