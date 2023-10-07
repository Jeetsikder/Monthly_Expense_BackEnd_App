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

// const initialDate = "2023-11";
// const month = new Date(initialDate).toDateString();
// const nextMonthDate = new Date(initialDate);
// nextMonthDate.setMonth(nextMonthDate.getMonth() + 1);
// console.log(month);
// console.log(nextMonthDate.toDateString());
