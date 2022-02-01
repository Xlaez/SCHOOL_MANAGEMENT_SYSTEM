const { Router } = require("express");
const {
  signUp,
  Login,
  reset,
  newPassword,
} = require("../src/controllers/auth.controller");

const router = Router();

router.post("/", signUp);
router.post("/signin", Login);
router.post("/reset", reset);
router.post("/:reset", newPassword);

module.exports.authRouter = router;
