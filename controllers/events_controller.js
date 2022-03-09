const express = require("express");

const Event = require("../models/Event");

const getEvents = async (req, res = express.response) => {
  try {
    const events = await Event.find().populate("user", "name email");

    res.status(200).json({
      ok: true,
      events,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error in the server",
    });
  }
};

const createEvent = async (req, res = express.response) => {
  try {
    const event = new Event(req.body);
    event.user = req.uid;
    await event.save();

    res.status(200).json({
      ok: true,
      event,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error in the server",
    });
  }
};

const updateEvent = async (req, res = express.response) => {
  const eventUid = req.params.uid;

  try {
    const event = await Event.findById(eventUid);

    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: "Event not found",
      });
    }

    if (event.user.toString() !== req.uid) {
      return res.status(401).json({
        ok: false,
        msg: "Not authorized",
      });
    }

    const newEvent = {
      ...req.body,
      user: req.uid,
    };

    const eventUpdated = await Event.findByIdAndUpdate(eventUid, newEvent);

    res.status(200).json({
      ok: true,
      event: eventUpdated,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error in the server",
    });
  }
};

const deleteEvent = async (req, res = express.response) => {
  const eventUid = req.params.uid;

  try {
    const event = await Event.findById(eventUid);

    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: "Event not found",
      });
    }

    if (event.user.toString() !== req.uid) {
      res.status(401).json({
        ok: false,
        msg: "Not authorized",
      });
    }

    await Event.findByIdAndDelete(eventUid);

    res.status(204);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error in the server",
    });
  }
};

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
};
