const { Router } = require("express");
const { isEmail, isPassword } = require("../config/validator");
const {
  signUp,
  Login,
  reset,
  newPassword,
} = require("../src/controllers/auth.controller");

const router = Router();

router.post("/", [isEmail, isPassword], signUp);
router.post("/signin", [isEmail, isPassword], Login);
router.post("/reset", reset);
router.post("/:reset", [isPassword], newPassword);

module.exports.authRouter = router;
