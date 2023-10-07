const mongoose = require("mongoose");
require("dotenv").config();

const connectToMongo = () => {
  mongoose
    .connect(process.env.MONGO_URL, {})
    .then(() => {
      console.log("Database connected");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connectToMongo;
