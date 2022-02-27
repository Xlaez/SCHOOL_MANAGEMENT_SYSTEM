const { Router } = require("express");

const {
  fetchAssignments,
  fetchSingleAssignment,
  editAssignment,
  deleteAssignment,
} = require("../src/controllers/assignment.controller");

const router = Router();

router.get("/", fetchAssignments);
router.get("/:id", fetchSingleAssignment);
router.put("/:id", editAssignment);
router.delete("/:id", deleteAssignment);

module.exports.assignmentRouter = router;
