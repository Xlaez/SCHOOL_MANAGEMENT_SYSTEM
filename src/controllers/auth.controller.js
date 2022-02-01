var { Users } = require("../modules/app.model");
const { sign, verify, decode } = require("jsonwebtoken");
const { compareSync, hashSync } = require("bcryptjs");
const { sendMail } = require("../../config/_mail");
const { randomBytes } = require("crypto");
require("dotenv").config();
var TOKEN_SECRET = process.env.TOKEN_SECRET;

getToken = (user) => {
  return sign({ id: user._id, username: user.email }, TOKEN_SECRET, {
    expiresIn: 780000,
  });
};

const signUp = async (req, res) => {
  const body = req.body;
  const user = await Users.findOne({ email: body.email });
  if (user) {
    return res
      .status(400)
      .json({ message: "This user already exists, try Loging in instead" });
  }
  var userModel = {
    fullname: body.fullname,
    email: body.email,
    password: hashSync(body.password, 12),
  };
  var users = new Users(userModel);
  var token = getToken(users);
  users.save();
  return res
    .status(201)
    .json({ message: "User created Successfully!", token: token });
};

const Login = async (req, res) => {
  const body = req.body;
  const user = await Users.findOne({ email: body.email });
  if (!user) {
    return res
      .status(400)
      .json({ message: "User not found, trying signing up!" });
  }
  var validPassword = compareSync(body.password, user.password);
  if (!validPassword)
    return res.status(400).send("Either email or password is wrong");
  var token = getToken(user);
  return res
    .status(201)
    .json({ message: "User successfully sign in", token: token });
};

const reset = (req, res) => {
  randomBytes(32, (err, buffer) => {
    if (err)
      return res.status(400).json({ message: "Cannot generate random byte" });
    var cryptoToken = buffer.toString("hex");

    Users.findOne({ email: req.body.email })
      .then((users) => {
        if (!users) {
          return res.status(400).json({
            message: "No user with this credentials found",
            status: "Fail",
          });
        }

        users.resetToken = cryptoToken;
        users.resetTokenExpiration = Date.now() + 3600000;
        users.save();
        return res
          .status(201)
          .json({ message: "reset link successfully sent", data: users });
      })
      .catch((err) => {
        return res
          .status(201)
          .json({ message: "user reset Link sent", data: users });
      });
  });
};

const newPassword = async (req, res) => {
  const body = req.body;
  const params = req.params;
  var user = await Users.findOne({
    resetToken: params.token,
    resetTokenExpiration: { $gt: Date.now() },
    _id: body.userId,
  });

  if (!user) {
    return res
      .status(400)
      .json({ message: "Something went wrong, try getting another link" });
  }
  user.password = hashSync(body.password, 12);
  user.resetToken = undefined;
  user.resetTokenExpiration = undefined;
  try {
    user.save();

    const response = sendMail({
      to: user.email,
      Subject: `Password reset successful`,
      html: `<p>${user.username} your password has been successfully reset, visit <a href="http://localhost:5000/auth/signin">here to login to your Future Agencies account to continue enjoying our services </a></p> `,
    });
    response;
    return res.status(200).json({
      message: "sent user login details successfully",
      user: user,
    });
  } catch (err) {
    return res.status(400).json(err);
  }
};

module.exports = {
  signUp,
  Login,
  reset,
  newPassword,
};
