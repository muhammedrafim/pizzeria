const OrderModel = require("../models/OrderModel");

CartModel = require("../models/CartModel");

// This functions adds new order
async function addOrder(userId) {
  try {
    // Fetching cart items of the specified user
    const cartItems = await CartModel.find({ user: userId });
    let grandTotal = 0;

    let orderItems = await cartItems.map(item => {
      grandTotal += item.totalCost;
      return {
        pizza: item.pizza,
        addOns: item.addOns,
        totalCost: item.totalCost
      };
    });

    // Create the Order Object with cart items
    let order = await OrderModel.create({
      items: orderItems,
      user: userId,
      grandTotal: grandTotal
    });

    return order;
  } catch (e) {
    console.log(e);
    return null;
  }
}
module.exports = {
  addOrder
};
