const { User } = require("../../models/app.model");
const { sign } = require("jsonwebtoken");
const { hashSync, compareSync } = require("bcryptjs");
const { randomBytes } = require("crypto");
const { sendMail } = require("../../config/_mail");
require("dotenv").config();
var TOKEN_SECRET = process.env.TOKEN_SECRET;

getToken = (user) => {
  return sign({ id: user._id, username: user.username }, TOKEN_SECRET, {
    expiresIn: 36000,
  });
};

const SignUp = async (req, res) => {
  const newuser = await User.findOne({ email: req.body.email });

  if (newuser) {
    return res
      .status(400)
      .json({ message: "User already exists", status: "Fail" });
  }
  const user = new User({
    fullname: req.body.fullname,
    username: req.body.username,
    email: req.body.email,
    password: hashSync(req.body.password, 12),
  });
  try {
    user.save();
    var token = getToken(user);

    res.status(201).json({
      id: user._id,
      email: user.email,
      username: user.username,
      accessToken: token,
      message: "User successfully created",
    });
  } catch (err) {
    return res.status(401).json(err);
  }
};

const Login = async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  });

  if (!user) {
    return res
      .status(400)
      .json({ message: "User doesn't exist", status: "Fail" });
  }

  var validPassword = compareSync(req.body.password, user.password);

  if (!validPassword) {
    return res
      .status(401)
      .json({ message: "Invalid input", accessToken: null });
  }

  var token = getToken(user);

  res.status(200).json({
    message: "User login successful",
    status: "Success",
    id: user._id,
    username: user.username,
    email: user.email,
    accessToken: token,
  });
};

const resetPassword = async (req, res) => {
  randomBytes(32, (err, buffer) => {
    if (err) {
      return res
        .status(400)
        .json({ message: "Error while generating hex value" });
    }
    var cryptoToken = buffer.toString("hex");
    User.findOne({ email: req.body.email })
      .then((user) => {
        if (!user) {
          return res.status(400).json({
            message: "No user with this credentials found",
            status: "Fail",
          });
        }

        user.resetToken = cryptoToken;
        user.resetTokenExpiration = Date.now() + 3600000;

        user.save();
        const response = sendMail({
          to: user.email,
          subject: "Password Reset Link",
          html: `<h3>Your reset link is <a href="http://localhost:5000/auth/reset/${cryptoToken}"> </a><h3> <br/>
           <p>Do well to visit the link soon as it expires in an hour</p>`,
        });
        return response;
      })
      .catch((err) => {
        return res.status(400).json(err);
      });
  });
};

const getPassword = (req, res) => {
  const body = req.body;
  let resetUser;
  const user = User.findOne({
    resetToken: body.resetToken,
    resetTokenExpiration: { $gt: Date.now() },
    _id: body.userId,
  });
  if (!user) {
    return res
      .status(400)
      .json({ message: "Something went wrong, try getting another link" });
  } else {
    resetUser = user;
    resetUser.password = hashSync(body.password, 12);
    resetUser.resetToken = undefined;
    resetUser.resetTokenExpiration = undefined;
    resetUser.save();
    const response = sendMail({
      to: resetUser.email,
      Subject: `Password reset successful`,
      html: `<p>${resetUser.username} your password has been successfully reset, visit <a href="http://localhost:5000/auth/signin">here to login to your Future Agencies account to continue enjoy our services </a></p> `,
    });
    return response;
  }
};

module.exports = {
  SignUp,
  Login,
  resetPassword,
  getPassword,
};
