const bcrypt = require("bcryptjs");
const express = require("express");

const createToken = require("../helpers/jwt");
const User = require("../models/User");

const register = async (req, res = express.response) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        ok: false,
        msg: "User already exists",
      });
    }

    user = new User(req.body);

    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    const token = await createToken(user.id, user.name);

    res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
      email: user.email,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      ok: false,
      msg: "Please, try again later",
    });
  }
};

const login = async (req, res = express.response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: "User not found",
      });
    }

    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Invalid password",
      });
    }

    const token = await createToken(user.id, user.name);

    res.status(200).json({
      ok: true,
      uid: user.id,
      name: user.name,
      email: user.email,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      ok: false,
      msg: "Please, try again later",
    });
  }
};

const renewToken = async (req, res = express.response) => {
  const uid = req.uid;

  try {
    const token = await createToken(uid);
    const user = await User.findById(uid);

    res.json({
      ok: true,
      uid: user.id,
      name: user.name,
      email: user.email,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      ok: false,
      msg: "Please, try again later",
    });
  }
};

module.exports = {
  register,
  login,
  renewToken,
};
