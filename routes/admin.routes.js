const { Router } = require("express");
const { grantAccess } = require("../middleware/_is_admin");
const {
  FetchStudentsForJunior,
  FetchStudentsForSenior,
  FetchAllStudents,
  FetchBlackList,
  FetchTeachers,
  postNotice,
  FetchRegisteredStudents,
  suspendStudent,
  AdmitStudent,
  AddTeacher,
  GetAdminData,
  AdmitStudentByEmail,
} = require("../src/controllers/admin.controlles");
const { fetchStudentDataByEmail } = require("../src/controllers/users.controller");

const router = Router();

router.get("/lower", [grantAccess], FetchStudentsForJunior);
router.get("/upper", [grantAccess], FetchStudentsForSenior);
router.get("/all", FetchAllStudents);
router.get("/registered", FetchRegisteredStudents);
router.get('/admin/:id', GetAdminData)
router.post("/add/teacher", AddTeacher)
router.post("/blacklisted", [grantAccess], FetchBlackList);
router.post('/admit', AdmitStudentByEmail)
router.post('/admit/:id', AdmitStudent)
router.post('/suspend', [grantAccess], suspendStudent)
router.get("/teachers", [grantAccess], FetchTeachers);
router.post("/notice", [grantAccess], postNotice);
router.post('/sort/student', fetchStudentDataByEmail);
module.exports.adminRouthe = router;
