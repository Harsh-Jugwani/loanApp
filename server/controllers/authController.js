const User = require("../models/user");
const { hashPassword, comparePassword } = require("../helpers/auth");
const jwt = require("jsonwebtoken");

//for testing the api available on 'api/v1/'
const test = (req, res) => {
  res.json("test is doing perfectly fine");
};

//to registere the user 
const registerUser = async (req, res) => {
  try {
    const { uname, email, password } = req.body;
    //if name was entered

    if (!uname) {
      return res.json({
        error: "name is required",
      });
    }
    //if password was entered

    if (!password || password.length < 6) {
      return res.json({
        error: "password is required and should be atleast 6 character long",
      });
    }

    const exist = await User.findOne({ email });
    //if email already exists
    if (exist) {
      return res.json({
        error: "Email is already taken",
      });
    }
    //hashed password
    const hashedPassword = await hashPassword(password);
    const user = await User.create({
      uname,
      email,
      password: hashedPassword,
    });
    return res.json(user);
  } catch (error) {
    console.log(error);
  }
};

//for login credentials
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        err: "no user found",
      });
    }

    //check if password match
    const match = await comparePassword(password, user.password);

    if (match) {
      jwt.sign(
        { name: user.uname, email: user.email, password: user.password },
        process.env.JWT_SECRET_KEY,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(user);
        }
      );

      return res.json({ user });
    }
    if (!match) {
      return res.json({
        err: "password do not match",
      });
    }
  } catch (error) {
    console.log(error);
  }
};



module.exports = { test, registerUser, loginUser };
