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

const socialLoginValidator = async (req, res, next) => {
  const { provider, accessToken } = req.body;

  if (provider === "google") {
    try {
      const response = await axios({
        url: `https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${accessToken}`,
        method: "GET",
      });

      next();
    } catch (error) {
      return res.status(500).json({ error: "Authentication failed" });
    }
  }

  if (provider === "facebook") {
    try {
      const response = await axios({
        url: `https://graph.facebook.com/me?access_token=${accessToken}`,
        method: "GET",
      });
      // console.log(response.data);
      next();
    } catch (error) {
      // console.error(error);
      return res.status(500).json({ error: "Authentication failed" });
    }
  }
};

module.exports = {
  userSignupValidator,
  userSigninValidator,
  socialLoginValidator,
};
