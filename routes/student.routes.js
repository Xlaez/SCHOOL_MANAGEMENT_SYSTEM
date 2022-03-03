const { Router } = require("express");

const {
  fetchStudentsInfo,
  checkResult,
} = require("../src/controllers/students.controller");
const router = Router();

router.get("/:id", fetchStudentsInfo);
router.post("/result/", checkResult);

module.exports.studentRouter = router;
