const { Router } = require("express");
const {
  fetchTeachersData,
  fetchTeachersStudents,
  postAssignment,
  uploadTeachersInfo,
  createStudentresult,
  editResult,
} = require("../src/controllers/teacher.contoller");

const router = Router();

router.get('/', fetchTeachersStudents);
router.get("/:id", fetchTeachersData);
router.post("/postInfo", uploadTeachersInfo);
router.post("/assignment", postAssignment);
router.post('/result', createStudentresult);
router.put('/result', editResult);

module.exports.staffRouter = router;
