const express = require("express");
const authRoutes = express.Router();
const {
  // userSignup,
  // userLogin,
  tokenIsValid,
  // logout,
  // socialLogin,
} = require("../controllers/auth-controller");

// const { runValidation } = require("../validators");
// const {
//   userSignupValidator,
//   userSigninValidator,
//   socialLoginValidator,
// } = require("../validators/auth");

// authRoutes.post("/signup", userSignupValidator, runValidation, userSignup);
// authRoutes.post("/login", userSigninValidator, runValidation, userLogin);
// authRoutes.post("/socialLogin", socialLoginValidator, socialLogin);
authRoutes.get("/isloggedin", tokenIsValid);
// authRoutes.get("/logout", logout);

module.exports = authRoutes;
