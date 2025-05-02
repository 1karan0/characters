//app create
const express = require("express");
const app = express();
const cors = require("cors");
app.use(
  cors({
    origin: "*",
  })
);

//PORt find krna h 
require("dotenv").config();
const PORT = process.env.PORT || 3000;

//middleware add krne h 
app.use(express.json());
const fileupload = require("express-fileupload");
app.use(fileupload({
  useTempFiles: true,
  tempFileDir: '/tmp/',
}));

//db se connect krnah 
const dbconnect = require("./config/database");
dbconnect();

//cloud se connect krna h 
// const cloudinary = require("./config/cloudinary");
// cloudinary.cloudinaryConnect();
const cloudinary = require('./config/cloudinary')
cloudinary.cloudinaryconnect()

//api route mount krna h 
const character = require("./routes/Routes");

app.use('/api/v1', character);

//activate server
app.listen(PORT, () => {
    console.log(`App is running at ${PORT}`);
})