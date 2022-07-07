const { check } = require("express-validator");

const axios = require("axios");

// express validator checks incoming payload to server
const userSignupValidator = [
  check("name").not().isEmpty().withMessage("Name is Required").trim(),

  check("email")
    .trim()
    .isEmail()
    .withMessage("Must be a valid email address")
    .normalizeEmail()
    .toLowerCase(),

  check("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
];

const userSigninValidator = [
  check("email")
    .trim()
    .isEmail()
    .withMessage("Must be a valid email address")
    .normalizeEmail()
    .toLowerCase(),

  check("password")
    .trim()
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
];

module.exports = {
  userSignupValidator,
  userSigninValidator,
};
