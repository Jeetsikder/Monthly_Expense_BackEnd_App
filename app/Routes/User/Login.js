"use strict";

const express = require("express");
const { returnSuccessRes, returnErrorRes } = require("../../Helpers");
const router = express.Router();

const { handelSchemaJoi } = require("../../Schema/User/Login");
const {
  checkUserExistence,
  matchPassword,
  generateAccessToken,
} = require("../../Controllers/User/Login");

// # Schema
router.use(handelSchemaJoi);

// # Middlewares
router.use(checkUserExistence, matchPassword, generateAccessToken);

router.use("/", (req, res) => {
  try {
    const successMsg = "Login successful";
    const payload = {
      accessToken: req.accessToken,
    };

    return returnSuccessRes(res, successMsg, payload);
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    return returnErrorRes(res);
  }
});

module.exports = router;
