const { check } = require("express-validator");

const validateForm = require("../middlewares/validate_form");

const registerRequest = [
  check("name", "Name is required").not().isEmpty(),
  check("email", "Email is required and must be an email address").isEmail(),
  check("password", "Password must be at least 6 characters").isLength({
    min: 6,
  }),
  validateForm,
];

const loginRequest = [
  [
    check("email", "Email is required and must be an email address").isEmail(),
    check("password", "Password must be at least 6 characters").isLength({
      min: 6,
    }),
    validateForm,
  ],
];

module.exports = {
  registerRequest,
  loginRequest,
};
