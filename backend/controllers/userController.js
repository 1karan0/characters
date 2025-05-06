const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "user already exist",
      });
    }
    let hashpassword;
    try {
      hashpassword = await bcrypt.hash(password, 10);
    } catch (err) {
      console.error(err);
      res.status(500).json({
        success: false,
        message: "error in hashing password",
        error: err.message,
      });
    }
    const user = await User.create({
      name,
      email,
      password: hashpassword,
    });
    return res.status(200).json({
      success: true,
      message: "User created successfully",
      user,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: "enter the email and password",
      });
    }
    const user = await User.findOne({ email });

    if (!user) {
      res.status(401).json({
        success: false,
        message: "user not found",
      });
    }
    const payload = {
      email: user.email,
      id: user._id,
    };
    if (await bcrypt.compare(password, user.password)) {
      let token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      user.token = token;
      user.password = undefined;
      const options = {
        expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: false,
        sameSite: "Lax",
      };
      res
        .cookie("token", token, options)
        .set("Authorization", `Bearer${token}`)
        .status(200)
        .json({
          success: true,
          token,
          user,
          message: "user loged in successfully",
        });
    } else {
      return res.status(403).json({
        success: false,
        message: "inccorect password",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};
