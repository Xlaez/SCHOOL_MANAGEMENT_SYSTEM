const { Router } = require("express");
const {
  fetchTeachersData,
  fetchTeachersStudents,
  postAssignment,
  uploadTeachersInfo,
  createStudentresult,
  editResult,
  setSubjects,
  isSubjectSet,
  subjects
} = require("../src/controllers/teacher.contoller");

const router = Router();

router.get('/students/:id', fetchTeachersStudents);
router.get("/:id", fetchTeachersData);
router.post("/postInfo", uploadTeachersInfo);
router.post("/assignment", postAssignment);
router.post('/result', createStudentresult);
router.put('/result', editResult);
router.post('/subjects', setSubjects)
router.get('/subject/:id', isSubjectSet);
router.get('/subjects/:id', subjects);
module.exports.staffRouter = router;
