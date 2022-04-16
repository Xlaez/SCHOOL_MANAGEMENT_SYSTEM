var { Users, Register, Teacher, Admin } = require("../modules/app.model");
const { sign, verify, decode } = require("jsonwebtoken");
const { compareSync, hashSync } = require("bcryptjs");
const { sendMail } = require("../../config/_mail");
const { randomBytes } = require("crypto");
require("dotenv").config();
var TOKEN_SECRET = process.env.TOKEN_SECRET;

getToken = (user) => {
  return sign({ id: user._id, email: user.email }, TOKEN_SECRET, {
    expiresIn: 360000,
  });
};

//SIGNUP A NEW STUDENT
const signUp = async (req, res) => {
  const body = req.body;
  var password = body.password;
  console.log(body.email)
  const user = await Register.findOne({ email: body.email });
  if (!user) {
    return res
      .status(400)
      .json({ message: "This user does not exists" });
  }

  var users = new Users({
    fullname: body.fullname,
    email: body.email,
    password: hashSync(password, 12),
  });
  var token = getToken(users);
  users.save();
  return res.status(201).json({
    message: "User created Successfully!",
    token: token,
    userId: users._id,
  });
};

const teacherSignup = async (req, res) => {

  const body = req.body;

  var isTeacher = await Teacher.findOne({ email: req.body.email });

  if (!isTeacher) return res.status(500).json({ message: "this teacher does not exist" });
  isTeacher.password = hashSync(body.password, 12);

  var token = getToken(isTeacher)

  isTeacher = await isTeacher.save();
  return res.status(201).json({
    message: "successfully signup",
    token: token,
    userId: isTeacher._id,
    teacherId: isTeacher.teacherId
  })
}

const teacherLogin = async (req, res) => {
  const body = req.body;

  var isTeacher = await Teacher.findOne({ email: req.body.email });

  if (!isTeacher) return res.status(500).json({ message: "this teacher does not exist" })

  var verify = await compareSync(body.password, isTeacher.password);

  if (!verify) return res.status(403).json({ message: "User has no permission" })

  var token = getToken(isTeacher);

  return res.status(201).json({ token: token, userId: isTeacher._id, teacherId: isTeacher.teacherId })
}

const adminSignup = async (req, res) => {
  const body = req.body;

  const image = req.file;

  if (!req.file) return res.status(500).send("no image");

  var isadmin = await Admin.findOne({ email: req.body.email });

  if (isadmin) return res.status(500).json({ message: "this admin already exist" });
  var admin = new Admin({
    name: body.name,
    email: body.email,
    password: hashSync(body.password, 12),
    adminType: "primary",
    image: image.path,
    adminId: 0012
  })
  admin = await admin.save();
  var token = getToken(admin)
  return res.status(201).json({
    message: "successfully signup",
    token: token,
    adminId: admin._id,
  })
}

const adminLogin = async (req, res) => {
  const body = req.body;
  var isAdmin = await Admin.findOne({ email: req.body.email });
  if (!isAdmin) return res.status(500).json({ message: "this teacher doess not exist" })
  var verify = await compareSync(body.password, isAdmin.password);
  if (!verify) return res.status(403).json({ mesage: "User has no permission" })
  var token = getToken(isAdmin);
  isAdmin.role = "admin"
  isAdmin = await isAdmin.save();
  return res.status(201).json({ token: token, userId: isAdmin._id, adminId: isAdmin.adminId })
}

//LOGIN FOR ANY USER
const Login = async (req, res) => {
  const body = req.body;
  const user = await Users.findOne({ email: body.email });
  if (!user) {
    return res
      .status(500)
      .json({ message: "User not found, trying signing up!" });
  }
  var reg_user = await Register.findOne({ email: body.email });
  if (!reg_user) return res.status(400).json({ message: "User not found, trying signing up!" })
  if (reg_user.admitted === false) return res.status(403).json({ message: "User hasn't been admitted yet" });
  var validPassword = compareSync(body.password, user.password);
  if (!validPassword)
    return res.status(400).send("Either email or password is wrong");

  var token = getToken(user);
  return res.status(201).json({
    message: "User successfully sign in",
    token: token,
    userId: user._id,
    regId: reg_user._id
  });
};

//RESET A USERS ACCOUNT PASSWORD
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

//STORE NEW PASSWORD
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
  teacherSignup,
  teacherLogin,
  adminLogin,
  adminSignup
};
