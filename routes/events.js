/*
  Events routes
  host + /api/events
*/

const express = require("express");
const router = express.Router();

const {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/events_controller");
const validateJWT = require("../middlewares/validate_jwt");
const eventRequest = require("../requests/event_request");

router.get("/", validateJWT, getEvents);
router.post("/", eventRequest, createEvent);
router.put("/:uid", eventRequest, updateEvent);
router.delete("/:uid", validateJWT, deleteEvent);

module.exports = router;
