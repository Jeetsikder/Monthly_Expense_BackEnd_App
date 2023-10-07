"use strict";

const express = require("express");

const router = express.Router();

const {
  filterAllowedExpenses,
  addNewExpense,
} = require("../../../Controllers/Mothy_expenses/Add");

const { handelSchemaJoi } = require("../../../Schema/Monthly_expenses/Add");
const { returnSuccessRes, returnErrorRes } = require("../../../Helpers");

// # Schema
router.use(handelSchemaJoi);

// # Add Middleware
router.use(filterAllowedExpenses, addNewExpense);

// # Success response
router.use("/", (req, res) => {
  try {
    const created_DocumentId = req.created_DocumentId;
    const payload = {
      created_DocumentId: created_DocumentId,
    };
    const msg = "We save your expense successfully";
    return returnSuccessRes(res, msg, payload);
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    return returnErrorRes(res);
  }
});

module.exports = router;
