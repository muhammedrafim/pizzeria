let { Schema, model } = require("mongoose");

// Creates Ingredients Schema
const IngredientSchema = new Schema({
  // Store the price of ingredient
  price: { type: Number, required: true },
  // Store the name of ingredient
  tname: { type: String, required: true },
  // Store the image url of ingredient
  image: { type: String, required: true }
});

// Creates ingredient model from Schema
let IngredientModel = model("Ingredient", IngredientSchema);

module.exports = IngredientModel;
