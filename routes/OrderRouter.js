const { clearCart } = require("../controllers/CartController");
const { addOrder } = require("../controllers/OrderController");
const verifyToken = require("../middlewares/auth");

// Order related routes
const orderRouter = require("express").Router();

// Creating new order
orderRouter.post("/create", verifyToken, async (req, res) => {
  try {
    let order = await addOrder(req.user.user_id);
    if (order) {
      // clearing current cart after order placed successfuly
      let cart = await clearCart(req.user.user_id);
      res.send({ status: 1, data: order });
    } else {
      res.send({ status: 0, msg: "Error while creating order" });
    }
  } catch (e) {
    console.log(e);
    res.send({ status: 0, msg: "Error while creating order" });
  }
});
module.exports = orderRouter;
