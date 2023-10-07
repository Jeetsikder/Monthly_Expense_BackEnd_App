"use strict";

const { returnErrorRes } = require("../../../Helpers");
const expenseModel = require("../../../Model/Monthly_expenses");

async function checkAvailableData_Db(req, res, next) {
  try {
    const userId = req.userId;
    let { startMonth } = req.body;

    let endMonth = new Date(startMonth);
    endMonth.setDate(endMonth.getMonth() + 1); // Add one day to endMonth

    startMonth = new Date(startMonth);
    endMonth = new Date(endMonth);

    await expenseModel
      .find({
        userId,
        date: {
          $gte: startMonth,
          $lte: endMonth,
        },
      })
      .select("-userId")
      .then((data) => {
        req.ExpenseBetweenMonth = data;
      })
      .catch((error) => {
        console.log(error);
        const error_Msg =
          "Sorry we can not get your Expense right now try gain letter";
        return returnErrorRes(res, error_Msg, 404);
      })
      .finally(() => {
        const data = req.ExpenseBetweenMonth;

        if (data.length === 0) {
          const error_Msg =
            "Sorry we can not get any Expense between this times";
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
