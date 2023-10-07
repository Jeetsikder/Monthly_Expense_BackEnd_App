const joi = require("joi");

const Schema = joi.object({
  name: joi
    .string()
    .min(3)
    .max(25)
    .required()
    .messages({ "any.required": "Name is required" }),

  email: joi.string().email().required().max(30).messages({
    "any.required": "Email is required",
    "string.email":
      "Invalid email address. Please enter a valid email address.",
  }),

  password: joi
    .string()
    .min(8)
    .max(30)
    .pattern(
      new RegExp(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      )
    )
    .messages({
      "string.pattern.base":
        "Password must be at least 8 characters long, and contain at least one uppercase letter, one lowercase letter, one digit, and one special character (e.g. !@#$%^&*)",
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
