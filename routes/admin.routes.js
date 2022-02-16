const { Router } = require("express");
const {
  FetchStudentsForJunior,
  FetchStudentsForSenior,
  FetchAllStudents,
  FetchBlackList,
  FetchSuspended,
  FetchTeachers,
  postNotice,
  FetchRegisteredStudents,
} = require("../src/controllers/admin.controlles");

const router = Router();

router.get("/lower", FetchStudentsForJunior);
router.get("/upper", FetchStudentsForSenior);
router.get("/all", FetchAllStudents);
router.get("/blacklisted", FetchBlackList);
router.get("/suspended", FetchSuspended);
router.get("/teachers", FetchTeachers);
router.post("/notice", postNotice);
router.get("/registered", FetchRegisteredStudents);
module.exports.adminRouthe = router;
