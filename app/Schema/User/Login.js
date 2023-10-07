const joi = require("joi");

const Schema = joi.object({
  email: joi
    .string()
    .email()
    .max(50)
    .messages({
      "any.required": "Email is required",
      "string.max": `Email should have a maximum length of 50`,
      "string.email":
        "Invalid email address. Please enter a valid email address",
    })
    .required(),

  password: joi
    .string()
    .min(1)
    .max(30)
    .messages({
      "string.empty": `Password cannot be empty`,
      "string.max": `Password should have a maximum length of 30`,
      "any.required": "Password is required",
    })
    .required(),
});

const handelSchemaJoi = (req, res, next) => {
  try {
    if (!Schema.validate(req.body)?.error?.message) {
      return next();
    }
    res.status(400).json({
      success: false,
      msg: Schema.validate(req.body)?.error?.message.replace(/"/g, ""),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Internal Server error",
    });
  }
};

module.exports = { handelSchemaJoi };
