const express = require("express");
const authRoutes = express.Router();
const {
  userSignup,
  userLogin,
  tokenIsValid,
  logout,
  getUserById,
} = require("../controllers/auth-controller");

const { runValidation } = require("../validators");

const {
  userSignupValidator,
  userSigninValidator,
} = require("../validators/auth");

authRoutes.post("/signup", userSignupValidator, runValidation, userSignup);
authRoutes.post("/login", userSigninValidator, runValidation, userLogin);
authRoutes.get("/isloggedin", tokenIsValid);
authRoutes.get("/logout", logout);
authRoutes.get("/user/:id", getUserById);

module.exports = authRoutes;
