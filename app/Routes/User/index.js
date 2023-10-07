"use strict";

const express = require("express");

const router = express.Router();
const create_User = require("./Create_user");
const user_Login = require("./Login");

router.post("/new", create_User);

router.post("/login", user_Login);

module.exports = router;
