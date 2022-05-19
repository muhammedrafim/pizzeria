const pizzaRouter = require("express").Router();
const { getPizzas } = require("../controllers/PizzaController");

// Pizza related routes

// Returns all pizza from DB
pizzaRouter.get("/", async (req, res) => {
  const pizzas = await getPizzas();
  res.send(pizzas);
});
module.exports = pizzaRouter;
