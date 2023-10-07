"use Strict";

const express = require("express");
const { returnSuccessRes, returnErrorRes } = require("../../../Helpers");

const router = express.Router();

const {
  handelSchemaJoi,
} = require("../../../Schema/Monthly_expenses/get_Month");

const {
  checkAvailableData_Db,
} = require("../../../Controllers/Mothy_expenses/Get/Month");
// # Schema
router.use(handelSchemaJoi);

// # Add Middleware
router.use(checkAvailableData_Db);

// # Success response
router.use("/", (req, res) => {
  try {
    const payload = req.ExpenseBetweenMonth;
    let { startMonth } = req.body;
    const msg = `Expense Month - ${startMonth} `;
    return returnSuccessRes(res, msg, payload);
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    return returnErrorRes(res);
  }
});

module.exports = router;
