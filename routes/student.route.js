const { Router } = require("express");
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
router.post("/upload/:id", uploadStudentsInfo);
router.put("/upload/:id", editStudentsInfo);
router.get("result/:id", checkResult);
router.get("subjects/:id", checkSubjects);
router.get("time-t/:id", checkReadingTimetable);

module.exports.studentRouter = router;
