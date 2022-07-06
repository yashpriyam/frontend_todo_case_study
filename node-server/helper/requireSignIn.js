const jwt = require("jsonwebtoken");

const isUserLoggedIn = (req) => {
  if (!req.cookies) {
    return null;
  }
  if (!req.cookies.auth_token) {
    return null;
  }
  const token = req.cookies.auth_token;
  try {
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!verifyToken) {
      return null;
    } else {
      return verifyToken._id;
    }
  } catch (err) {
    return null;
  }
};

const requireSignIn = (req, res, next) => {
  const userID = isUserLoggedIn(req);
  if (!userID) {
    res.clearCookie("auth_token");
    return res.status(401).json({ error: "You need to login first." });
  } else {
    req.user = userID;
    next();
  }
};

module.exports = { requireSignIn };