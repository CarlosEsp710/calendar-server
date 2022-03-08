const mongoose = require("mongoose");
require("dotenv").config();

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION);
    console.log("Connected to database");
  } catch (error) {
    console.error(error);
    throw new Error("Database connection failed");
  }
};

module.exports = dbConnection;
