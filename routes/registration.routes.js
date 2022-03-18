const { Router } = require("express");
const { isEmail, isPassword } = require("../config/validator");
const {checkForClass} = require('../import/_class_id_func')
const {
  postRegisteration,
  getSingleRegistration,
  editRegisteredStudent,
  sendBiodata,
} = require("../src/controllers/register.controller");

const router = Router();

router.post("/",postRegisteration);
router.get("/:id",getSingleRegistration);
router.put("/:id", editRegisteredStudent);
router.get('/get/:id', sendBiodata);

module.exports.registrationRouthe = router;
