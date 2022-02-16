const { Users, Notice, Register } = require("../modules/app.model");
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
      timestamps: "desc",
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
  FetchSuspended,
  FetchTeachers,
  FetchNonTeachers,
  postNotice,
};
