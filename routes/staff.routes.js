const { Router } = require("express");
const {
  fetchTeachersData,
  fetchTeachersStudents,
  postAssignment,
  uploadTeachersInfo,
} = require("../src/controllers/staff.contoller");

const router = Router();

router.get("/", fetchTeachersData);
router.post("/postInfo", uploadTeachersInfo);
router.get("/:id", fetchTeachersStudents);
router.post("/assignment", postAssignment);

module.exports.staffRouter = router;
