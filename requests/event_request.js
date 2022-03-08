const { check } = require("express-validator");

const isDate = require("../helpers/isDate");
const validateForm = require("../middlewares/validate_form");
const validateJWT = require("../middlewares/validate_jwt");

const eventRequest = [
  check("title", "Title is required").not().isEmpty(),
  check("notes", "Notes is required").not().isEmpty(),
  check("start", "Start date is required").custom(isDate),
  check("end", "End date is required").custom(isDate),
  validateForm,
  validateJWT,
];

module.exports = eventRequest;
