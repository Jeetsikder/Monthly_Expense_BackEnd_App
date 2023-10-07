"use strict";

const { returnErrorRes } = require("../../../Helpers");
const expenseModel = require("../../../Model/Monthly_expenses");

async function checkAvailableData_Db(req, res, next) {
  try {
    const userId = req.userId;
    let { startDate } = req.body;

    let endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 1); // Add one day to endDate

    startDate = new Date(startDate);
    endDate = new Date(endDate);

    await expenseModel
      .find({
        userId,
        date: {
          $gte: startDate,
          $lte: endDate,
        },
      })
      .select("-userId")
      .then((data) => {
        req.ExpenseBetweenDate = data;
      })
      .catch((error) => {
        console.log(error);
        const error_Msg =
          "Sorry we can not get your Expense right now try gain letter";
        return returnErrorRes(res, error_Msg, 404);
      })
      .finally(() => {
        const data = req.ExpenseBetweenDate;

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
