"use strict";

const express = require("express");
const { returnSuccessRes, returnErrorRes } = require("../../../Helpers");

const router = express.Router();

const {
  checkAvailableData_Db,
} = require("../../../Controllers/Mothy_expenses/Get/All");

// # Add Middleware
router.use(checkAvailableData_Db);

// # Success response
router.use("/", (req, res) => {
  try {
    const payload = req.allExpense;

    const msg = `Your all expense.`;

    return returnSuccessRes(res, msg, payload);
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    return returnErrorRes(res);
  }
});

module.exports = router;
