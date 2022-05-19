let { Schema, model } = require("mongoose");

// Creates pizzaItemSchema : contians pizza , add On ingredients and total cost of both
const PizzaItemSchema = new Schema({
  // pizzaa object
  pizza: { type: Schema.Types.ObjectId, ref: "Pizza" },
  // Ingredient object as a list
  addOns: [{ type: Schema.Types.ObjectId, ref: "Ingredient" }],
  // total cost : pizza cost + add ons cost
  totalCost: { type: Number }
});

// Creates Order schema
const OrderSchema = new Schema({
  // Above created pizzaItemSchema as an array
  items: [PizzaItemSchema],
  // Total cost of the cart
  grandTotal: { type: Number },
  // User to which this Order Belong
  user: { type: Schema.Types.ObjectId, ref: "User", required: true }
});

// Order model from above schema
let OrderModel = model("Order", OrderSchema);

module.exports = OrderModel;
