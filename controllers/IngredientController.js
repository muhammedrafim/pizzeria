let ingredientModel = require("../models/IngredientModel");

// This function returns ingredients
async function getIngredients() {
  try {
    let ingredients = await ingredientModel.find({}, {});
    return { status: 1, data: ingredients };
  } catch (e) {
    console.log("Error from get pizza controller ", e);
    return { status: 0, msg: e };
  }
}
module.exports = {
  getIngredients
};
