const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    require: true,
  },

  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  currency: {
    name: {
      type: String,
      default: "Indian Rupee (INR)",
    },
    symbol: {
      type: String,
      default: "&#8377;",
    },
    code: {
      type: String,
      default: "INR",
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    default: null,
  },
});

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
