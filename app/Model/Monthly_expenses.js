const mongoose = require("mongoose");
const { Schema } = mongoose;

const expenseSchema = new Schema({
  userId: {
    type: String,
    require: true,
  },

  category: {
    type: String,
    require: true,
  },

  amount: {
    type: String,
    require: true,
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

const expenseModel = mongoose.model("expense", expenseSchema);
module.exports = expenseModel;
