"use strict";

const express = require("express");

const router = express.Router();

const {
  filterAllowedExpenses,
  addNewExpense,
  get_Expense_All,
} = require("../../../Controllers/Mothy_expenses/Add");

const { handelSchemaJoi } = require("../../../Schema/Monthly_expenses/Add");
const { returnSuccessRes, returnErrorRes } = require("../../../Helpers");
require("../../../Controllers/Mothy_expenses/Get/Date");

// # Schema
router.use(handelSchemaJoi);

// # Add Middleware
router.use(filterAllowedExpenses, addNewExpense);

// # Get all expense
router.use(get_Expense_All);

// # Success response
router.use("/", (req, res) => {
  try {
    const payload = req.allExpense;
    const { category, amount } = req.body;
    const msg = `Expense of ${amount} in the category ${category} has been saved successfully`;

    return returnSuccessRes(res, msg, payload);
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    return returnErrorRes(res);
  }
});

module.exports = router;
