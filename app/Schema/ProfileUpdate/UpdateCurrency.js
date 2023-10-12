"use strict";

const joi = require("joi");
const { returnErrorRes } = require("../../Helpers");

const currencySchema = joi.object({
  name: joi.string().max(50).required(),
  code: joi.string().max(11).required(),
  symbol: joi.string().max(11).required(),
});

const handelSchemaJoi = (req, res, next) => {
  try {
    if (!currencySchema.validate(req.body)?.error?.message) {
      return next();
    }

    // # Send error
    const errorMsg = currencySchema
      .validate(req.body)
      ?.error?.message.replace(/"/g, "");
    return returnErrorRes(res, errorMsg, 400);
  } catch (error) {
    console.log(error); // Log the errors
    const errorMsg = "Internal Server error";
    return returnErrorRes(res, errorMsg);
  }
};

module.exports = { handelSchemaJoi };
