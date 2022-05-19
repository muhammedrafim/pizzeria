const jwt = require("jsonwebtoken");

// This function is used to verify token when we send a request from frontend
function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers["authorization"];
  // Check if bearer is undefined
  if (typeof bearerHeader !== "undefined") {
    // Split at the space
    const bearer = bearerHeader.split(" ");
    // Get token from array
    const bearerToken = bearer[1];

    jwt.verify(bearerToken, process.env.TOKEN_KEY, (err, authData) => {
      if (err || !authData) {
        return res.json({
          status: 0,
          msg: "Session Expired"
        });
      } else {
        // Set the userID
        req.user = authData;
        // Next middleware
        next();
      }
    });
  } else {
    // Forbidden

    return res.json({ status: 0, msg: "Unauthorized" });
  }
}
module.exports = verifyToken;
