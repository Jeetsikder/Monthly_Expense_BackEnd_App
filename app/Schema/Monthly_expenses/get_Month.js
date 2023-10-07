const joi = require("joi");

const rangeSchema = joi.object({
  startMonth: joi.date().iso().required().messages({
    "date.base": "Month must be a valid date in ISO format",
    "date.format":
      "Month must be in ISO format (e.g., YYYY-MM-DDTHH:mm:ss.sssZ)",
    "any.required": "Start month is required",
  }),
});

const handelSchemaJoi = (req, res, next) => {
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
