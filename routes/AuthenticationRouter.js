const {
  login,
  signup,
  checkUserExists
} = require("../controllers/AuthenticationController");
const verifyToken = require("../middlewares/auth");

// Authentication related routes

const authenticationRouter = require("express").Router();

// This is used to verify token validity
authenticationRouter.get("/", verifyToken, async (req, res) => {
  res.send({ status: 1, data: req.user });
});

// Login route
authenticationRouter.post("/login", async (req, res) => {
  // Our login logic starts here
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.send({ status: 0, msg: "All input is required" });
    } else {
      // check user have given correct email and password
      const user = await login(email, password);
      if (user) {
        return res.send({ status: 1, msg: "Login Success", user: user });
      } else {
        return res.send({ status: 0, msg: "Login Error Invaid Credentials" });
      }
    }
  } catch (e) {
    console.log(e);
  }

  const result = await login();
  res.send(result);
});

// Signup route
authenticationRouter.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(req.body);
    // Validate user input
    if (!(email && password && name)) {
      return res.status(400).send({ status: 0, msg: "All input is required" });
    }
    // Checks users exists or not
    if (await checkUserExists(email)) {
      return res.send({ status: 0, msg: "User Already Exist. Please Login" });
    } else {
      const user = await signup(email, password, name);
      if (user) {
        res.send({ status: 1, msg: "Signup Success", user: user });
      } else {
        res.send({ status: 0, msg: "Sign up Error" });
      }
    }
  } catch (e) {
    console.log(e);
  }
});
module.exports = authenticationRouter;
