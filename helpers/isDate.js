const moment = require("moment");

const isDate = (value, { req, location, path }) => {
  if (!value) {
    return false;
  }

  if (moment(value).isValid()) {
    return true;
  } else {
    return false;
  }
};

module.exports = isDate;
