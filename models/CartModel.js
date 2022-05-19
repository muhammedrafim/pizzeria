let { Schema, model } = require("mongoose");

// Creating cart schema

const CartSchema = new Schema({
  // Store the pizza object
  pizza: { type: Schema.Types.ObjectId, ref: "Pizza", required: true },
  // Store the ingredients as an array
  addOns: [{ type: Schema.Types.ObjectId, ref: "Ingredient" }],
  // Total cost : pizza + ingredients cost
  totalCost: { type: Number },
  // User object whom this cart belongs
  user: { type: Schema.Types.ObjectId, ref: "User", required: true }
});

// Creates cart Model from schema
let CartModel = model("CartItem", CartSchema);

module.exports = CartModel;
