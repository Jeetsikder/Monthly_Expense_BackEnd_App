"use strict";

const express = require("express");
const {
  getUserPersonalInfo,
} = require("../../Controllers/User/UserInfo/UserInfo");
const { returnSuccessRes, returnErrorRes } = require("../../Helpers");
const router = express.Router();

router.use(getUserPersonalInfo);

router.use("/", (req, res, next) => {
  try {
    const successMsg = "User information retrieved successfully.";
    const payload = req.userInfo;

    return returnSuccessRes(res, successMsg, payload);
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    const errorMsg =
      "Unable to retrieve user information. Please try again later.";

    return returnErrorRes(res, errorMsg);
  }
});

module.exports = router;
