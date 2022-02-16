const { Router } = require("express");
const {
  getNotice,
  getSingleNotice,
  editNotice,
  deleteNotice,
} = require("../src/controllers/notice.controller");

const router = Router();

router.get("/", getNotice);
router.get("/:id", getSingleNotice);
router.put("/:id", editNotice);
router.delete("/:id", deleteNotice);

module.exports.noticeRouthe = router;
