"use strict";

const { returnErrorRes } = require("../../../Helpers");
const expenseModel = require("../../../Model/Monthly_expenses");

async function checkAvailableData_Db(req, res, next) {
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

        if (data.length === 0) {
          const error_Msg =
            "Sorry to say you can not save any Expense right now.";
          return returnErrorRes(res, error_Msg, 404);
        }

        return next();
      });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    return returnErrorRes(res);
  }
}

module.exports = { checkAvailableData_Db };
