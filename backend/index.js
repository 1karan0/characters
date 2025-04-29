const express = require("express");
const dbconnect = require("./config/database");
dbconnect(); // Connect to the database
const charRoutes = require("./routes/Routes");
const cors = require("cors");
const app = express();
const path = require("path");

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(
  cors({
    origin: "*",
  })
);

app.use("/api/v1", charRoutes);
// Set up the server to listen on a specified port
PORT = process.env.PORT || 4000;
require("dotenv").config();

// Middleware to parse JSON requests
app.use(express.json());

// starts the server and listens for incoming requests
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});
