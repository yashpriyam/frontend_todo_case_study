const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },

  password: {
    type: String,
  },

  provider: [
    {
      type: String,
    },
  ],

  bio: {
    type: String,
  },
  status: {
    type: String,
  },
  board: {
    type: String,
  },
  profile_image_url: {
    type: String,
  },
  profile_image_key: {
    type: String,
  },
  reputation: {
    type: Number,
  },
  resetToken: {
    data: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isOnline: {
    type: Boolean,
  },
  googleDriveFolder: {
    type: String,
  },
  googleDriveTokens: {
    access_token: {
      type: String,
    },
    refresh_token: {
      type: String,
    },
    scope: {
      type: String,
    },
    scope: {
      type: String,
    },
    token_type: {
      type: String,
    },
    id_token: {
      type: String,
    },
    expiry_date: {
      type: Number,
    },
  },
});

UserSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = await jwt.sign(
    { _id: user._id.toString() },
    process.env.JWT_SECRET,
    {
      expiresIn: "3d",
    }
  );
  return token;
};

// UserSchema.methods.generateRefreshToken = async function () {
//   const user = this;
//   const token = await jwt.sign(
//     { _id: user._id.toString() },
//     process.env.JWT_REFRESH_TOKEN_SECRET,
//     {
//       expiresIn: "1y",
//     }
//   );

//   return token;
// };

UserSchema.pre("save", async function (next) {
  try {
    if (this.isNew) {
      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(this.password, salt);
      this.password = hashedPassword;
    }
    next();
  } catch (error) {
    next(error);
  }
});

UserSchema.methods.authenticate = async function (password) {
  try {
    return await bcryptjs.compare(password, this.password);
  } catch (error) {
    throw error;
  }
};

const user = mongoose.model("User", UserSchema);

module.exports = user;
