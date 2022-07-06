const User = require("../db-models/users-models");

const checkUserName = async (req, res) => {
  const username = req.params.username;
  const isUserNameValid = await User.findOne({ name: username });
  if (!isUserNameValid) {
    return res.status(200).json({ message: true });
  } else {
    res.status(200).json({ message: false });
  }
};

const getUserById = async(req, res)=>{
  const  userId = req.user;
  try {
    const userData = await User.findById(userId);
    const {name, id, email, profile_image_url } = userData;
    
    res.status(200).json({ name, id, email, profile_image_url  });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

module.exports = {
  checkUserName,
  getUserById
};
