"use strict";

const express = require("express");
const {
  handelSchemaJoi,
} = require("../../Schema/ProfileUpdate/UpdateCurrency");
const {
  UpdateCurrency,
} = require("../../Controllers/ProfileUpdate/UpdateCurrency");
const { returnSuccessRes, returnErrorRes } = require("../../Helpers");

const router = express.Router();

// # Add Scheme
router.use(handelSchemaJoi);

// # Add Middleware
router.use(UpdateCurrency);

// # Success response
router.use("/", (req, res) => {
  try {
    const payload = req.body;
    const successMsg = "Currency update successfully";

    // * Send Success res
    return returnSuccessRes(res, successMsg, payload);
  } catch (error) {
    const errorMsg =
      "Your Currency update due some server error we cannot send success msg our team working on it";
    returnErrorRes(res, errorMsg, 500);
  }
});

module.exports = router;
