const Joi = require("joi");

const PASSWORD_REGEX = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()\\-_=+{};:'\",.<>?[\\]\\\\/]).{8,}$"
);
const NAME_REGEX = new RegExp("^[a-zA-Z0-9]+$");

const loginSchema = Joi.object({
  email: Joi.string().trim().email().lowercase().required(),
  password: Joi.string().trim().required(),
});

const registerSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(3)
    .pattern(NAME_REGEX, "Name must contain only letters and numbers")
    .required(),
  email: Joi.string().trim().email().lowercase().required(),
  password: Joi.string()
    .trim()
    .pattern(
      PASSWORD_REGEX,
      "Password must contain at least 1 uppercase, 1 lowercase, 1 special character, 1 number, and be at least 8 characters long"
    )
    .required(),
});

const updateUserSchema = Joi.object({
  password: Joi.string().trim().required(),
  newPassword: Joi.string()
    .trim()
    .pattern(
      PASSWORD_REGEX,
      "Password must contain at least 1 uppercase, 1 lowercase, 1 special character, 1 number, and be at least 8 characters long"
    ).required(),
});

const deleteUserSchema = Joi.object({
  password: Joi.string().trim().required(),
})


const refreshTokenSchema = Joi.object({
  refreshToken: Joi.string().required().label("Refresh Token"),
});


module.exports = {
  loginSchema,
  registerSchema,
  refreshTokenSchema,
  updateUserSchema,
  deleteUserSchema
};
