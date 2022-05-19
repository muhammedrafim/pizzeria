const { getIngredients } = require("../controllers/IngredientController");

const ingeredientRouter = require("express").Router();
// Ingredient related routes

// Return all ingredients
ingeredientRouter.get("/", async (req, res) => {
  const ingeredients = await getIngredients();
  res.send(ingeredients);
});
module.exports = ingeredientRouter;
