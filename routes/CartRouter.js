const {
  addItemToCart,
  getCartItems,
  removeItemFromCart
} = require("../controllers/CartController");
const verifyToken = require("../middlewares/auth");

// Cart related routes
const cartRouter = require("express").Router();

// Route is used to return cart items
cartRouter.get("/", verifyToken, async (req, res) => {
  try {
    const cartItems = await getCartItems(req.user.user_id);
    if (cartItems) res.send({ status: 1, data: cartItems });
    else res.send({ status: 0, msg: "Error Fetching cart items" });
  } catch (e) {
    console.log(e);
    res.send({ status: 0, msg: e });
  }
});

// Delete a cart Item
cartRouter.post("/delete", verifyToken, async (req, res) => {
  try {
    const cartItem = await removeItemFromCart(req.body.cartId);

    if (cartItem) {
      const cartItems = await getCartItems(req.user.user_id);

      res.send({ status: 1, data: cartItems });
    } else res.send({ status: 0, msg: "Error While Removing item" });
  } catch (e) {
    console.log(e);
    res.send({ status: 0, msg: e });
  }
});

// Add new item to cart
cartRouter.post("/add", verifyToken, async (req, res) => {
  try {
    const cartItem = await addItemToCart(req.body, req.user.user_id);
    if (cartItem) {
      res.send({ status: 1, data: cartItem });
    } else {
      res.send({ status: 0, msg: "Error while adding item to cart" });
    }
  } catch (e) {
    console.log(e);
    res.send({ status: 0, msg: "Error while adding item to cart" });
  }
});

module.exports = cartRouter;
