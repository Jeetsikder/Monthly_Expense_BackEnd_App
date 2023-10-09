"use strict";

const { returnErrorRes } = require("../../../Helpers");
const expenseModel = require("../../../Model/Monthly_expenses");

async function filterAllowedExpenses(req, res, next) {
  try {
    const { category } = req.body;
    const listExpense = JSON.parse(process.env.Expense_TOPIC);
    const match_Category = listExpense.find(
      (expense) => expense.toLowerCase() === category.toLowerCase()
    );
    if (match_Category) return next();
    const error_Msg = "Please add this expense in other category";
    return returnErrorRes(res, error_Msg, 422);
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    return returnErrorRes(res);
  }
}

async function addNewExpense(req, res, next) {
  try {
    const userId = req.userId;
    const { category, amount } = req.body;

    const addNewExpense_Db = await new expenseModel({
      userId,
      amount,
      category,
    });
    addNewExpense_Db
      .save()
      .then(() => {
        req.created_DocumentId = addNewExpense_Db._id;
        return next();
      })
      .catch((error) => {
        console.log(error);
        const error_Msg =
          "We can not save your expense please try again some time letter";
        return returnErrorRes(res, error_Msg, 500);
      });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    return returnErrorRes(res);
  }
}

async function get_Expense_All(req, res, next) {
  try {
    const userId = req.userId;

    await expenseModel
      .find({
        userId,
      })
      .select("-userId")
      .then((data) => {
        req.allExpense = data;
      })
      .catch((error) => {
        console.log(error);
        const error_Msg =
          "Sorry we can not get your Expense right now try gain letter";
        return returnErrorRes(res, error_Msg, 404);
      })
      .finally(() => {
        const data = req.allExpense;
        return next();

        if (data.length === 0) {
          const error_Msg =
            "Sorry to say you can not save any Expense right now.";
          return returnErrorRes(res, error_Msg, 404);
        }
      });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    return returnErrorRes(res);
  }
}

module.exports = { filterAllowedExpenses, addNewExpense, get_Expense_All };
