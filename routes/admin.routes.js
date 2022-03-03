const { Router } = require("express");
const { grantAccess } = require("../middleware/_is_admin");
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

router.get("/lower", [grantAccess], FetchStudentsForJunior);
router.get("/upper", [grantAccess], FetchStudentsForSenior);
router.get("/all", [grantAccess], FetchAllStudents);
router.post("/blacklisted", [grantAccess], FetchBlackList);
router.get("/suspended", [grantAccess], FetchSuspended);
router.get("/teachers", [grantAccess], FetchTeachers);
router.post("/notice", [grantAccess], postNotice);
router.get("/registered", [grantAccess], FetchRegisteredStudents);
module.exports.adminRouthe = router;
