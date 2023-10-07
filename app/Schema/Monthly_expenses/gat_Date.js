const joi = require("joi");

const rangeSchema = joi.object({
  startDate: joi.date().iso().required().messages({
    "date.base": "Start date must be a valid date in ISO format",
    "date.format":
      "Start date must be in ISO format (e.g., YYYY-MM-DDTHH:mm:ss.sssZ)",
    "any.required": "Start date is required",
  }),
});

const handelSchemaJoi = (req, res, next) => {
  console.log(req.body);
  try {
    if (!rangeSchema.validate(req.body)?.error?.message) {
      return next();
    }
    res.status(400).json({
      success: false,
      msg: rangeSchema.validate(req.body)?.error?.message.replace(/"/g, ""),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Internal Server error",
    });
  }
};

module.exports = { handelSchemaJoi };
