let pizzaModel = require("../models/PizzaModel");

// This function returns the pizza data from MongoDB
async function getPizzas() {
  try {
    let pizzas = await pizzaModel.find({});
    return { status: 1, data: pizzas };
  } catch (e) {
    console.log("Error from get pizza controller ", e);
    return { status: 0, msg: e };
  }
}
module.exports = {
  getPizzas
};
