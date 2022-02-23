const { Users } = require("../modules/app.model");
require("dotenv").config();

const {
  IdJSSone,
  IdJSSthree,
  IdJSStwo,
  IdSSSone,
  IdSSSthree,
  IdSSStwo,
} = require("../../import/classIDs");

// FETCH STUDENTS DATA
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
    .catch((err) => {
      return res.status(400).json(err);
    });
};

//UPLOAD STUDENTS DATA
const uploadStudentsInfo = (req, res) => {
  const body = req.body;
  const { id } = req.params;
  const image = req.file;
  console.log(image);
  if (!image)
    return res.status(400).json({ message: "Image type not supported" });
  var imageUrl = image.path;
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
        image: imageUrl,
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

//EDIT STUDENTS DATA
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

//CHECK STUDENT RESULT FROM PORTAL
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

//CHECK SUBJECTS A STUDENT OFFER
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

//CHECK READING TIMETABLE
const checkReadingTimetable = (req, res) => {
  const { id } = req.params;
  Users.findById(id)
    .then((studentData) => {
      var classTimetable = studentData.timetable;
      let finalData;
      finalData = classTimetable.forEach((day) => {
        return day;
      });
      return res.status(200).json({ data: finalData });
    })
    .catch((err) => {
      return res.status(400).json(err);
    });
};

//SET READING TIMETABLE
// const createReadingTimeTable = (req, res) =>{
//   const {id} = req.params;
//   const newTimeTable =

//   Users.findById(id).then(studentData =>{
//     if(studentData.timetable === null)return res.status(400).json({message:"no data for this user found"})
//     var newTimeTable = new timetable({})
//   })
// }

module.exports = {
  fetchStudentsInfo,
  uploadStudentsInfo,
  editStudentsInfo,
  checkResult,
  checkSubjects,
  checkReadingTimetable,
};
