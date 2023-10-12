"use strict";

const express = require("express");

const router = express.Router();

const new_Expense = require("./Add");
const get_Expense_Date = require("./Get/Date");
const get_Expense_Month = require("./Get/Month");
const get_Expense_All = require("./Get/All");

// # Routes
router.post("/add", new_Expense);

router.post("/get/date", get_Expense_Date);

router.post("/get/month", get_Expense_Month);

router.get("/get/all", get_Expense_All);

module.exports = router;
