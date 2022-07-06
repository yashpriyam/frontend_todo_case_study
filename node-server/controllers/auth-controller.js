const User = require("../db-models/users-models");
const jwt = require("jsonwebtoken");

const userSignup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userDoesExist = await User.findOne({ email });
    if (userDoesExist) {
      return res.status(409).json({
        message: "User with this email already exists.",
      });
    }
    const user = new User({ name, email, password });
    const savedUser = await user.save();
    const token = await savedUser.generateAuthToken();
    const { _id, name: newName, email: newEmail } = savedUser;

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24 * 3,
    });
    return res.status(201).json({
      message: {
        user: { id: _id, name: newName, email: newEmail },
      },
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "User with this email does not exist. Please signup.",
      });
    }
    const doesPasswordMatch = await user.authenticate(password);
    if (!doesPasswordMatch) {
      return res.status(401).json({
        message: "Email and password do not match.",
      });
    }
    const token = await user.generateAuthToken();
    const { _id, name, email: newEmail, profile_image_url } = user;

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24 * 3,
    });

    return res.status(200).json({
      message: {
        user: { id: _id, name, email: newEmail, profile_image_url },
      },
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const tokenIsValid = async (req, res) => {
  try {
    // const token = req.cookies.auth_token;
    // if (!token) {
    //   return res.status(401).json({ error: "Unauthorized user." });
    // }

    // const verifyToken = jwt.verify(token, process.env.JWT_SECRET);

    // if (verifyToken) {
    //   res.status(200).json({ message: true });
    // } else {
    //   return res.status(401).json({ message: false });
    // }
    res.send("Request Successful")
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const authorisedRoute = async (req, res, next) => {
  try {
    const token = req.cookies.auth_token;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized user." });
    }

    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);

    if (verifyToken) {
      req.user = verifyToken._id;
      next();
    } else {
      return res.status(401).json({ error: "Unauthorized user." });
    }
  } catch (error) {
    return res.status(500).json({ error: "Unauthorized user." });
  }
};
const socialLogin = async (req, res) => {
  try {
    // need to pass the access token also and verify before creating a user
    //https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=<access_token>
    //https://graph.facebook.com/me?access_token=xxxxxxxxxxxxxxxxx

    const { email, provider, name } = req.body;
    
    const userDoesExist = await User.findOne({ email });

    let savedUser;

    // if user not exist then we create a new user and create a token
    if (!userDoesExist) {
      const userName = name;
      const newUser = new User({
        name: userName,
        email,
        password: "",
        profile_image_url: req.body.profile_image_url,
      });
      savedUser = await newUser.save();

    } else {
      savedUser = userDoesExist;
    }

    // adding provider to user model
    await User.findOneAndUpdate(
      { email },
      {
        $addToSet: { provider },
      }
    );

    const token = await savedUser.generateAuthToken();
    const {
      _id,
      name: newName,
      email: newEmail,
    } = savedUser;

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24 * 3,
    });

    return res.status(200).json({
      message: {
        user: {
          id: _id,
          name: newName,
          email: newEmail,
          profile_image_url: savedUser.profile_image_url,
        },
      },
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const logout = (req, res) => {
  res.clearCookie("auth_token");
  return res.status(200).json({ message: "Logged out successfully." });
};
module.exports = {
  userSignup,
  userLogin,
  socialLogin,
  tokenIsValid,
  logout,
  authorisedRoute,
};
