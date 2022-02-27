const { Router } = require("express");

const {
  fetchStudentsInfo,
  uploadStudentsInfo,
  editStudentsInfo,
  checkResult,
} = require("../src/controllers/students.controller");
const router = Router();

router.get("/:id", fetchStudentsInfo);
router.post("/upload/:id", uploadStudentsInfo);
router.put("/upload/:id", editStudentsInfo);
router.post("/result/", checkResult);

module.exports.studentRouter = router;
