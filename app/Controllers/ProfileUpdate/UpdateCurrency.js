"use strict";

const { returnErrorRes } = require("../../Helpers");
const userModel = require("../../Model/User/Create_user.");

async function UpdateCurrency(req, res, next) {
  try {
    const currency_Update = req.body;
    const userId = req.userId;

    userModel
      .updateOne(
        { _id: userId },
        {
          $set: {
            currency: currency_Update,
          },
        }
      )
      .exec()
      .then((data) => (req.updatedData = data))
      .catch((error) => {
        // # If we cannot update
        console.log(error);
        const errorMsg =
          "Sorry we can not update your currency now please try again.";
        return returnErrorRes(res, errorMsg, 500);
      })
      .finally(() => next());
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    return returnErrorRes(res);
  }
}

module.exports = { UpdateCurrency };
