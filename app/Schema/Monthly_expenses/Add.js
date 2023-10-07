const joi = require("joi");

const expenseSchema = joi.object({
  category: joi.string().min(3).required().messages({
    "string.base": "Category must be a string",
    "string.empty": "Category is required",
    "string.min": "Category should have a minimum length of 3",
    "any.required": "Category is required",
  }),
  amount: joi.number().min(1).required().messages({
    "number.base": "Amount must be a number",
    "number.empty": "Amount is required",
    "number.min": "Amount should be greater than or equal to 1",
    "any.required": "Amount is required",
  }),
});

const handelSchemaJoi = (req, res, next) => {
  try {
    if (!expenseSchema.validate(req.body)?.error?.message) {
      return next();
    }
    res.status(400).json({
      success: false,
      msg: expenseSchema.validate(req.body)?.error?.message.replace(/"/g, ""),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Internal Server error",
    });
  }
};

module.exports = { handelSchemaJoi };
