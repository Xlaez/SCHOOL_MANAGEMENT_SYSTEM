const { Router } = require("express");
// const { isEmail, isPassword } = require("../config/validator");
const {
  signUp,
  Login,
  reset,
  newPassword,
  teacherSignup,
  teacherLogin,
  adminLogin,
  adminSignup
} = require("../src/controllers/auth.controller");


const router = Router();

router.post("/", signUp);
router.post("/signin", Login);
router.post("/reset", reset);
router.post('/admin/signin', adminLogin)
router.post('/teacher/signin', teacherLogin);
router.post('/teacher', teacherSignup)
router.post('/admin', adminSignup)
router.post("/:reset", newPassword);
module.exports.authRouter = router;
