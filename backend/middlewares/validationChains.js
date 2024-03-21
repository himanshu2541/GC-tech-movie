const { body } = require("express-validator");

const createEmailChain = () =>
  body("email")
    .trim()
    .isEmail()
    .withMessage("Please enter a valid email")
    .normalizeEmail();

const createPasswordChain = () =>
  body("password")
    .trim()
    .isLength({ min: 8 })
    .withMessage("Minimum 8 characters required");

const createNameChain = () =>
  body("name")
    .trim()
    .custom((value) => {
      const regex = /^[a-zA-Z\s]+$/;
      if (regex.test(value)) {
        return true;
      }
      return false;
    })
    .withMessage("Please enter a valid name");

module.exports = { createEmailChain, createPasswordChain, createNameChain };
