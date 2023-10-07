"use strict";

const express = require("express");
const connectToMongo = require("./app/Db");
var cors = require("cors");

const app = express();
app.use(cors());

const PORT = process.env.PORT || 8081;
connectToMongo();

// * Require files
const user = require("./app/Routes/User");
const Expense = require("./app/Routes/Expenses");
const {
  LoggedINnUserToken_Exist,
  LoggedINnUserToken_Verify,
  LoggedINnUserId_matchIN_Db,
} = require("./app/Auth");

// * Middlewares
app.use(express.json());
require("dotenv").config();

app.use(function (err, req, res, next) {
  if (err) {
    if (err.type === "entity.parse.failed") {
      res.status(500).json({
        msg: "Ahh something bad",
      });
    }
  }
});

// # Middleware
app.use(
  "/auth",
  LoggedINnUserToken_Exist,
  LoggedINnUserToken_Verify,
  LoggedINnUserId_matchIN_Db
);

// * User Routers
app.use("/user", user);

// * Add Monthly Expenses
app.use("/auth/expenses", Expense);

app.listen(PORT, () => {
  console.log(`Back-End listen on ${PORT}`);
});
