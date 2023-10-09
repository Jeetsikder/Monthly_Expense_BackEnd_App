"use strict";

const express = require("express");

const router = express.Router();
const create_User = require("./Create_user");
const user_Login = require("./Login");
const user_Info = require("./UserInfo");

const {
  LoggedINnUserToken_Exist,
  LoggedINnUserToken_Verify,
  LoggedINnUserId_matchIN_Db,
} = require("../../Auth");

router.use(
  "/auth",
  LoggedINnUserToken_Exist,
  LoggedINnUserToken_Verify,
  LoggedINnUserId_matchIN_Db
);

router.post("/new", create_User);

router.post("/login", user_Login);

router.get("/auth/info", user_Info);

module.exports = router;
