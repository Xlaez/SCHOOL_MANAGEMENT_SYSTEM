const { Router } = require("express");
const {
  fetchStudentsInfo,
  uploadStudentsInfo,
  editStudentsInfo,
  checkResult,
  checkSubjects,
} = require("../src/controllers/students.controller");
const router = Router();

router.get("/:id", fetchStudentsInfo);
router.post("/upload/:id", uploadStudentsInfo);
router.put("/upload/:id", editStudentsInfo);
router.get("result/:id", checkResult);
router.get("subjects/:id", checkSubjects);

module.exports.studentRouter = router;
