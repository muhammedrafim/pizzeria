let CartModel = require("../models/CartModel");
const IngredientModel = require("../models/IngredientModel");
const PizzaModel = require("../models/PizzaModel");
const UserModel = require("../models/UserModel");

// Adds a new item to cart
async function addItemToCart(item, userId) {
  try {
    // Taking pizza Object from MongoDB
    const pizza = await PizzaModel.findById(item.pizza);
    let totalCost = pizza.price;
    // Taking ingredients object from MongoDB
    let addOns = await Promise.all(
      item.addOns.map(async addOn => {
        const ingredient = await IngredientModel.findById(addOn);
        totalCost += ingredient.price;
        return ingredient._id;
      })
    );

    // Taking User object from MongoDB

    const user = await UserModel.findById(userId);

    // Creating a cartItem it will be stored in MongoDB
    let cartItem = await CartModel.create({
      pizza: pizza._id,
      addOns: addOns,
      totalCost: totalCost,
      user: user._id
    });
    // Fetching the mentioned ingredients data from Ingredinets Collections
    let cart = await cartItem.populate("addOns");

    cart.pizza = pizza;
    return cart;
  } catch (e) {
    console.log(e);
    return null;
  }
}

// This function returns the cart for the specific user
async function getCartItems(userId) {
  try {
    let cartItems = await CartModel.find({ user: userId })
      .populate("addOns")
      .populate("pizza");

    return cartItems;
  } catch (e) {
    console.log(e);
    return null;
  }
}

// This function removes a specified cart item
async function removeItemFromCart(id) {
  try {
    let removedItems = await CartModel.findByIdAndDelete(id);
    return removedItems;
  } catch (e) {
    console.log(e);
    return null;
  }
}
// This function will remove all items from cart of a particular user
async function clearCart(userId) {
  try {
    let removedItem = await CartModel.deleteMany({ user: userId });
    return removedItem;
  } catch (e) {
    console.log(e);
    return null;
  }
}
module.exports = {
  addItemToCart,
  getCartItems,
  removeItemFromCart,
  clearCart
};
