const express = require("express");
const userRoutes = express.Router();
const {
  getUserById,
  // updateUser,
  // forgotPassword,
  // updatePassword,
  // getUserReputation,
  checkUserName,
  // getUserOnlineActivity,
  // getProfilePic,
} = require("../controllers/user-controller");
const { requireSignIn } = require("../helper/requireSignIn");
// const upload = require("../controllers/attachment-controller");

userRoutes.get("/",requireSignIn, getUserById);
// userRoutes.patch(
//   "/update",
//   requireSignIn,
//   upload.single("profileImage"),
//   updateUser
// );
// userRoutes.post("/forgot_password", forgotPassword);
// userRoutes.post("/reset_password", updatePassword);
// userRoutes.get("/reputation/:userName", getUserReputation);
userRoutes.get("/checkusername/:username", checkUserName);
// userRoutes.get("/profilePic/:userId", getProfilePic);
// userRoutes.get("/user_online_activity/:userName", getUserOnlineActivity);

module.exports = userRoutes;
