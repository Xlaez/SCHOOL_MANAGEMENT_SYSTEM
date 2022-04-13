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
  GetAdminData
} = require("../src/controllers/admin.controlles");

const router = Router();

router.get("/lower", [grantAccess], FetchStudentsForJunior);
router.get("/upper", [grantAccess], FetchStudentsForSenior);
router.get("/all", FetchAllStudents);
router.get("/registered", FetchRegisteredStudents);
router.get('/admin/:id', GetAdminData)
router.post("/add/teacher", AddTeacher)
router.post("/blacklisted", [grantAccess], FetchBlackList);
router.post('/admit/:id', AdmitStudent)
router.post('/suspend', [grantAccess], suspendStudent)
router.get("/teachers", [grantAccess], FetchTeachers);
router.post("/notice", [grantAccess], postNotice);
module.exports.adminRouthe = router;
