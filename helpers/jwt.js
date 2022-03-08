const jwt = require("jsonwebtoken");
require("dotenv").config();

const createToken = (uid, name) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { uid, name },
      process.env.JWT_SECRET,
      {
        expiresIn: "2h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("Could not sign token");
        }

        resolve(token);
      }
    );
  });
};

module.exports = createToken;
