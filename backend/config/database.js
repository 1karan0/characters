const mongoose = require("mongoose");
require("dotenv").config();

const dbconnect = () => {
  mongoose
    .connect(process.env.DATABASE_URL)

    .then(() => console.log("Database connected successfully"))
    .catch((err) => {
      console.log("Database connection failed", err);
      process.exit(1);
    });
};

module.exports = dbconnect;
