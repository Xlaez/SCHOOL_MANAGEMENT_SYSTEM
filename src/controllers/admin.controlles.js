const { Users } = require("../modules/app.model");
require("dotenv").config();
var IDJuniorClass = process.env.ID_JUNIORCLASS;
var IDSeniorClass = process.env.ID_SENIORCLASS;

var {
  IdJSSone,
  IdJSStwo,
  IdJSSthree,
  IdSSSone,
  IdSSStwo,
  IdSSSthree,
} = require("../../import/classIDs");

const newJSS1ID = IdJSSone.concat(IDJuniorClass);
const newJSS2ID = IdJSStwo.concat(IDJuniorClass);
const newJSS3ID = IdJSSthree.concat(IDJuniorClass);
const newSSS1ID = IdSSSone.concat(IDSeniorClass);
const newSSS2ID = IdSSStwo.concat(IdSSStwo);
const newSSS3ID = IdSSSthree.concat(IdJSSthree);

// Note: create class Id for students

// Fetch all students for a class
const FetchStudentsForJunior = (req, res) => {
  Users.find({ classId: IDJuniorClass })
    .then((students) => {
      if (students === null) return res.status(400).send("An error occured");
      return res.status(200).json({ data: students });
    })
    .catch((err) => {
      return res.status(400).json(err);
    });
};

const FetchStudentsForSenior = (req, res) => {
  Users.find({ classId: IDSeniorClass })
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
      email: "desc",
    })
    .then((students) => {
      const name = students.fullname;
      const email = students.email;
      const image = students.image;
      const phone = students.phone;
      const studentclass = students.class;
      const subject = students.subject;
      var studentData = {
        name,
        email,
        image,
        phone,
        studentclass,
        subject,
      };
      return res.status(200).json({
        message: "Student Data successfully extracted",
        data: studentData,
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
      return res
        .status(200)
        .json({ message: "Student Added to balcklist", data: student });
    })
    .catch((err) => {
      return res.status(400).json(err);
    });
};

const suspendStudent = (req, res) => {
  const { userId } = req.params;
  Users.findOne(req.body.email)
    .then((student) => {
      student.suspended = true;
      return res
        .status(200)
        .json({ message: "Student Added to Suspension list", data: student });
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

const FetchSuspended = (req, res) => {
  Users.find()
    .sort({
      email: "desc",
    })
    .then((students) => {
      if (!students === true)
        return res.status(400).json({ message: "Sorry an error occcured" });
      return res.status(200).json({
        message: "Successfully found bsuspended students",
        data: students,
      });
    })
    .catch((err) => {
      return res.status(400).json(err);
    });
};

const FetchTeachers = (req, res) => {
  Users.find()
    .then((teachers) => {
      if (teachers === null) return res.status(400).send("No User found!");
      if (teachers.role === "Teacher" || teachers.role === "teacher") {
        return res.status(200).json({
          message: "All teachers have been found",
          data: teachers.role,
        });
      }
    })
    .catch((err) => {
      return res.status(400).json(err);
    });
};

module.exports = {
  FetchStudentsForJunior,
  FetchStudentsForSenior,
  FetchAllStudents,
  putStudentInBlackList,
  suspendStudent,
  FetchBlackList,
  FetchSuspended,
  FetchTeachers,
};
