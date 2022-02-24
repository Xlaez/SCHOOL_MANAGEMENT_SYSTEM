const { Router } = require("express");
const {
  fetchTeachersData,
  fetchTeachersStudents,
  postAssignment,
  uploadTeachersInfo,
  createStudentresult,
  editResult,
} = require("../src/controllers/staff.contoller");

const router = Router();

router.get("/", fetchTeachersData);
router.post("/postInfo", uploadTeachersInfo);
router.get("/:id", fetchTeachersStudents);
router.post("/assignment", postAssignment);
router.post('/result', createStudentresult);
router.put('/result', editResult);

module.exports.staffRouter = router;
