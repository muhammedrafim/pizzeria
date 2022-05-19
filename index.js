// Making .env file avialable in modules
require("dotenv").config();
// Express for server
const express = require("express");
// Cors for Cross orgin resource sharing
const cors = require("cors");
const app = express();
// Mongoose
const mongoose = require("mongoose");

// Routers
const pizzaRouter = require("./routes/PizzaRouter");
const ingeredientRouter = require("./routes/IngredientRouter");
const authenticationRouter = require("./routes/AuthenticationRouter");
const cartRouter = require("./routes/CartRouter");
const orderRouter = require("./routes/OrderRouter");

// Data from .env file
const { mongoURI, PORT } = process.env;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Mongoose connection
mongoose.connect(mongoURI);

// Db configuration
const db = mongoose.connection;

db.on("error", console.log.bind(console, "connection error"));
db.once("open", () => console.log("coonnected to mongoose"));

// Routes
app.use("/api/pizza", pizzaRouter);
app.use("/api/ingredient", ingeredientRouter);
app.use("/api/auth", authenticationRouter);
app.use("/api/cart", cartRouter);
app.use("/api/orders", orderRouter);

// App listen
app.listen(PORT, () => console.log("Express Server Listening on port ", PORT));
