const { Router } = require("express");
const { isEmail, isPassword } = require("../config/validator");
const {
  postRegisteration,
  getSingleRegistration,
  editRegisteredStudent,
} = require("../src/controllers/register.controller");

const router = Router();

router.post("/", postRegisteration);
router.get("/:id", getSingleRegistration);
router.put("/:id", editRegisteredStudent);

module.exports.registrationRouthe = router;
