const { Router } = require("express");
const { studentId } = require("../middleware/_createStudentsId");
const {
  fetchStudentsInfo,
  uploadStudentsInfo,
  editStudentsInfo,
  checkResult,
  checkSubjects,
  checkReadingTimetable,
} = require("../src/controllers/students.controller");
const router = Router();

router.get("/:id", fetchStudentsInfo);
router.post("/upload/:id", [studentId], uploadStudentsInfo);
router.put("/upload/:id", editStudentsInfo);
router.get("result/:id", checkResult);
router.get("subjects/:id", checkSubjects);
router.get("time-t/:id", checkReadingTimetable);

module.exports.studentRouter = router;
