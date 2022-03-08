/*
  Auth routes
  host + /api/auth
*/

const express = require("express");
const router = express.Router();

const {
  register,
  login,
  renewToken,
} = require("../controllers/auth_controller");
const validateJWT = require("../middlewares/validate_jwt");
const { registerRequest, loginRequest } = require("../requests/auth_request");

router.post("/register", registerRequest, register);
router.post("/login", loginRequest, login);
router.get("/renew-token", validateJWT, renewToken);

module.exports = router;
