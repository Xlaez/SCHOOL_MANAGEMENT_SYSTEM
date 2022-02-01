const { Users } = require("../modules/app.model");
require("dotenv").config();

const fetchStudentsInfo = (req, res) => {
  const { id } = req.params;
  Users.findOne({ _id: id })
    .then((studentsInfo) => {
      if (studentsInfo === null || !studentsInfo)
        return res.status(400).json({ message: "Couldn't get student Info" });
      return res.status(200).json({
        message: `Found ${studentsInfo.fullname} data `,
        data: studentsInfo,
      });
    })
    .catch((ERR) => {
      return res.status(400).json(err);
    });
};

const uploadStudentsInfo = (req, res) => {
  const body = req.body;
  const { id } = req.params;
  Users.findOne({ _id: id })
    .then((student) => {
      if (student === null || !student)
        return res
          .status(400)
          .json({ message: "This student can't be identified!" });

      var preDetails = {
        fullname: student.fullname,
        email: student.email,
        password: student.password,
      };
      var updatedUserInfo = new Users({
        fullname: preDetails.fullname,
        email: preDetails.email,
        password: preDetails.password,
        ...body,
      });
      updatedUserInfo.save();
      return res.status(201).json({
        message: "Student data attached to database",
        data: updatedUserInfo,
      });
    })
    .catch((err) => {
      return res.status(400).json(err);
    });
};

const editStudentsInfo = (req, res) => {
  const body = req.body;
  const { id } = req.params;

  Users.findByIdAndUpdate(id, body)
    .then((updatedStudent) => {
      if (updatedStudent === null)
        return res
          .status(400)
          .json({ message: "updated information returned a null value" });
      return res.status(201).json({
        message: `Updated ${body.fullname}'s data successfully`,
        data: updatedStudent,
      });
    })
    .catch((err) => {
      return res.status(401).json(err);
    });
};

const checkResult = (req, res) => {
  const { id } = req.params;
  Users.findOne({ _id: id })
    .then((studentsData) => {
      var studentsResult = studentsData.result;
      return res.status(200).json({
        message: `Result successfully retreived for ${studentsData.fullname} `,
        data: studentsResult,
      });
    })
    .catch((err) => {
      return res.status(400).json({ message: "=======an error occurred", err });
    });
};

const checkSubjects = (req, res) => {
  const { id } = req.params;
  Users.findById(id)
    .then((studentData) => {
      var studentSubjects = studentData.subjects;
      studentSubjects.forEach((subject) => {
        return subject;
      });
      return res.status(200).json({
        message: `Found subjects for ${studentData.fullname} successfully!`,
        data: studentSubjects,
      });
    })
    .catch((err) => {
      return res.status(400).json(err);
    });
};

module.exports = {
  fetchStudentsInfo,
  uploadStudentsInfo,
  editStudentsInfo,
  checkResult,
  checkSubjects,
};
