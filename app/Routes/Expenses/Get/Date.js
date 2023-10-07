"use strict";

const express = require("express");

const router = express.Router();

const {
  handelSchemaJoi,
} = require("../../../Schema/Monthly_expenses/gat_Date");

const {
  checkAvailableData_Db,
} = require("../../../Controllers/Mothy_expenses/Get/Date");
const { returnErrorRes, returnSuccessRes } = require("../../../Helpers");

// # Schema
router.use(handelSchemaJoi);

// # Add Middleware
router.use(checkAvailableData_Db);

// # Success response
router.use("/", (req, res) => {
  try {
    const payload = req.ExpenseBetweenDate;
    let { startDate } = req.body;
    const msg = `Expense Date - ${startDate}.`;

    return returnSuccessRes(res, msg, payload);
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    return returnErrorRes(res);
  }
});

module.exports = router;
