const cors = require("cors");
const express = require("express");
require("dotenv").config();

const dbConnection = require("./database/config");

// CREATE SERVER
const app = express();

// DB CONNECTION
dbConnection();

// CORS
app.use(cors());

// PUBLIC DIRECTORY
app.use(express.static("public"));

// PARSE REQUESTS
app.use(express.json());

// ROUTES
app.use("/api/auth", require("./routes/auth"));
app.use("/api/events", require("./routes/events"));

// REQUESTS
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
