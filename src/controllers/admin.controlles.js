const { Users, Notice, Register } = require("../modules/app.model");
const { getIo } = require('../mixins/connection.socket')
require("dotenv").config();

var JUNIOR_ID = process.env.ID_JUNIORCLASS
var SENIOR_ID = process.env.ID_SENIORCLASS
var SENIOR1 = process.env.ID_SENIOR1
var SENIOR2 = process.env.ID_SENIOR2
var SENIOR3 = process.env.ID_SENIOR3
var JUNIOR1 = process.env.ID_JUNIOR1
var JUNIOR2 = process.env.ID_JUNIOR2
var JUNIOR3 = process.env.ID_JUNIOR3


// Fetch all students for a class
const FetchStudentsForJunior = (req, res) => {
  Users.find({ sectionId: JUNIOR_ID })
    .then((students) => {
      console.log(students)
      if (students === null) return res.status(400).send("An error occured");
      return res.status(200).json({ data: students });
    })
    .catch((err) => {
      return res.status(400).json(err);
    });
};

const FetchStudentsForSenior = (req, res) => {
  Users.find({ sectionId: SENIOR_ID })
    .then((students) => {
      if (students === null) return res.status(400).send("An error occured");
      return res.status(200).json({ data: students });
    })
    .catch((err) => {
      return res.status(400).json(err);
    });
};

const FetchAllStudents = (req, res) => {
  Users.find()
    .sort({
      email: "asc",
    })
    .then((students) => {
      if (students == null) return res.status(400).send("null")

      return res.status(200).json({
        message: "Student Data successfully extracted",
        data: students,
      });
    })
    .catch((err) => {
      return res.status(400).json(err);
    });
};

const putStudentInBlackList = (req, res) => {
  const { userId } = req.params;
  Users.findOne(req.body.email)
    .then((student) => {
      student.blackId = true;

      student.save()
      return res
        .status(200)
        .json({ message: "Student Added to balcklist", data: student });
    })
    .catch((err) => {
      return res.status(400).json(err);
    });
};

const suspendStudent = (req, res) => {
  Users.findOne({ email: req.body.email })
    .then((student) => {
      if (!student) return res.send('not found')
      student.suspended = !student.suspended;
      student.save()
      return res
        .status(200)
        .json({ message: "Action taken", data: student });
    })
    .catch((err) => {
      return res.status(400).json(err);
    });
};

// FEtch BalckList and Suspension LIst

const FetchBlackList = (req, res) => {
  Users.find()
    .sort({
      email: "desc",
    })
    .then((students) => {
      if (!blackId === true)
        return res.status(400).json({ message: "Sorry an error occured" });
      return res.status(200).json({
        message: "Successfully found blacklisted students",
        data: students,
      });
    })
    .catch((err) => {
      return res.status(400).json(err);
    });
};

const FetchTeachers = (req, res) => {
  Users.find({ role: "teacher" })
    .then((teachers) => {
      if (teachers === null) return res.status(400).send("No User found!");

      return res.status(200).json({
        message: "All teachers have been found",
        data: teachers,
      });
    })
    .catch((err) => {
      return res.status(400).json(err);
    });
};

const FetchNonTeachers = (req, res) => {
  let role = "non-teaching";
  Users.find({ role: role })
    .then((nonTeachers) => {
      if (nonTeachers === null)
        return res.status(400).send("No non-teahers found");
      return res.status(200).json({
        message: "successfully gotten non-teaching staffs",
        data: nonTeachers,
      });
    })
    .catch((err) => {
      return res.status(400).json(err);
    });
};

const postNotice = async (req, res) => {
  const { body } = req;
  try {
    var notice = new Notice({
      ...body,
    });
    notice = await notice.save();
    getIo().emit('notice', {
      action: 'create', notice: notice
    })
    return res.status(201).json({
      message: "Notice successfully created and posted to the notice portal",
      data: notice,
    });
  } catch (err) {
    return res.status(400).json(err);
  }
};

const FetchRegisteredStudents = (req, res) => {
  Register.find()
    .sort({
      timestamps: "asc",
    })
    .then((registeredStudents) => {
      if (registeredStudents === null || !registeredStudents)
        return res.status(400).json({ message: "No registered student found" });
      return res.status(200).json({
        message: "Registered students gotten from database",
        data: registeredStudents,
      });
    })
    .catch((err) => {
      return res.status(400).json(err);
    });
};

module.exports = {
  FetchRegisteredStudents,
  FetchStudentsForJunior,
  FetchStudentsForSenior,
  FetchAllStudents,
  putStudentInBlackList,
  suspendStudent,
  FetchBlackList,
  FetchTeachers,
  FetchNonTeachers,
  postNotice,
};
