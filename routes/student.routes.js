const { Router } = require("express");
const { studentId } = require("../middleware/_createStudentsId");
const { createDrafts, fetchDrafts } = require("../src/controllers/staff.contoller");
const {
  fetchStudentsInfo,
  uploadStudentsInfo,
  editStudentsInfo,
  checkResult,
} = require("../src/controllers/students.controller");
const router = Router();

router.get("/:id", fetchStudentsInfo);
router.post("/upload/:id", [studentId], uploadStudentsInfo);
router.put("/upload/:id", editStudentsInfo);
router.post("/result/", checkResult);

module.exports.studentRouter = router;
