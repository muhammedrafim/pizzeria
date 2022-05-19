let userModel = require("../models/UserModel");
let bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Perform Login functionality
async function login(email, password) {
  try {
    // Checking for user with given email
    let user = await userModel.findOne({ email });
    // Check for user email adn password match
    if (user && (await bcrypt.compare(password, user.password))) {
      // Creating token with user data
      const token = jwt.sign(
        { user_id: user._id, email, name: user.name },
        process.env.TOKEN_KEY,
        { expiresIn: "2h" }
      );
      user.token = token;
      return user;
    }
    return null;
  } catch (err) {
    console.log(err);
    return null;
  }
}
//Perform Signup functionality
async function signup(email, password, name) {
  try {
    // Encrypting user password
    encryptedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({
      email,
      password: encryptedPassword,
      name
    });
    //Creating token
    const token = jwt.sign(
      { user_id: user._id, email, name },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h"
      }
    );
    user.token = token;
    return user;
  } catch (e) {
    console.log(e);
    return null;
  }
}

// Check whether user already exists or not : Used when registering a new user
async function checkUserExists(email) {
  const oldUser = await userModel.findOne({ email });
  if (oldUser) {
    return true;
  } else {
    return false;
  }
}

module.exports = {
  login,
  signup,
  checkUserExists
};
