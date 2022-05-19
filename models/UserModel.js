let { Schema, model } = require("mongoose");

// Creates user schema
const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  token: { type: String }
});
// Creates user model
let UserModel = model("User", UserSchema);
module.exports = UserModel;
