const { Users } = require("../src/modules/app.model");
require("dotenv").config();
const ID_JUNIORCLASS = process.env.ID_JUNIORCLASS;
const ID_SENIORCLASS = process.env.ID_SENIORCLASS;

var concat = "1++";
const studentId = (req, res, next) => {
  var body = req.body;
  if (body.role === "student") {
    if (
      body.clanamess === "junior1" ||
      body.class === "junior2" ||
      body.class === "junior3"
    ) {
      Users.findOne({ _id: req.params.id })
        .then((student) => {
          student.studentId = ID_JUNIORCLASS.concat(concat);
          next();
        })
        .catch((err) => {
          return res.status(400).json(err);
        });
    }
  }

  if (
    body.class === "senior1" ||
    body.class === "senior2" ||
    body.class === "senior3"
  ) {
    Users.findOne({ _id: req.params.id })
      .then((student) => {
        student.studentId = ID_SENIORCLASS.concat(concat);
        next();
      })
      .catch((err) => {
        return res.status(400).json(err);
      });
  }
};

module.exports = {
  studentId,
};
