const User = require("../db-models/users-models");
const jwt = require("jsonwebtoken");

function getRandomColor() {
  let letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const userSignup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const avatar_color = getRandomColor();
    const userDoesExist = await User.findOne({ email });
    if (userDoesExist) {
      return res.status(409).json({
        message: "User with this email already exists.",
      });
    }
    const user = new User({ name, email, password, avatar_color });
    const savedUser = await user.save();
    const token = await savedUser.generateAuthToken();
    const {
      _id,
      name: newName,
      email: newEmail,
      avatar_color: new_avatar_color,
    } = savedUser;

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24 * 3,
    });
    return res.status(201).json({
      message: {
        user: {
          id: _id,
          name: newName,
          email: newEmail,
          avatar_color: new_avatar_color,
        },
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

const getUserById = async (req, res) => {
  const userId = req.params.id;
  console.log(userId);
  try {
    const userData = await User.findById(userId);
    const { name, id, email, avatar_color } = userData;

    res.status(200).json({ name, id, email, avatar_color });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const tokenIsValid = async (req, res) => {
  try {
    const token = req.cookies.auth_token;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized user." });
    }

    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);

    if (verifyToken) {
      res.status(200).json({ message: true });
    } else {
      return res.status(401).json({ message: false });
    }
    // res.send("success");
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
  tokenIsValid,
  logout,
  getUserById,
};
