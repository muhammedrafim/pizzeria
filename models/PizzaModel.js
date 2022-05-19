let { Schema, model } = require("mongoose");

// Pizza schema
const PizzaSchema = new Schema({
  // Type of pizza :  veg or non veg
  type: { type: String, required: true },
  // Price of pizza
  price: { type: Number, required: true },
  // Name of pizza
  name: { type: String, required: true },
  // Image url from pizza
  image: { type: String, required: true },
  // Description of pizza
  description: String,
  // ingredients of pizza
  ingredients: [String],
  // Topping of pizza
  topping: [String]
});

// Creates pizza model from schema
let PizzaModel = model("Pizza", PizzaSchema);

module.exports = PizzaModel;
