const { Users, Result } = require("../modules/app.model");
require("dotenv").config();
var JUNIOR_ID = process.env.ID_JUNIORCLASS
var SENIOR_ID = process.env.ID_SENIORCLASS
var SENIOR1 = process.env.ID_SENIOR1
var SENIOR2 = process.env.ID_SENIOR2
var SENIOR3 = process.env.ID_SENIOR3
var JUNIOR1 = process.env.ID_JUNIOR1
var JUNIOR2 = process.env.ID_JUNIOR2
var JUNIOR3 = process.env.ID_JUNIOR3


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
  const file = req.file;
  const { id } = req.params;

  if (!file) return res.status(400).json({ message: "FIle type not supported or too large" });
  let updatedUserInfo;
  Users.findById(id).then(

    student => {
      let sectionId;
      let classId;
      if (body.class === 'junior1' || body.class == 'junior2' || body.class === 'junior3') {
        sectionId = JUNIOR_ID
        classId = JUNIOR_ID
        if (body.class === 'junior1') {
          classId = classId.concat(JUNIOR1)
        } else if (body.class === 'junior2') {
          classId = classId.concat(JUNIOR2)
        } else if (body.class === 'junior3') {
          classId = classId.concat(JUNIOR3)
        }
      }
      if (body.class === 'senior1' || body.class == 'senior2' || body.class == 'senior3') {
        sectionId = SENIOR_ID
        classId = SENIOR_ID
        if (body.class === 'senior1') {
          classId = classId.concat(SENIOR1)
        } else if (body.class === 'senior2') {
          classId = classId.concat(SENIOR2)
        } else if (body.class === 'senior3') {
          classId = classId.concat(SENIOR3)
        }
      }
      var preDetails = {
        fullname: student.fullname,
        email: student.email,
        password: student.password,
      };
      updatedUserInfo = ({
        fullname: preDetails.fullname,
        email: preDetails.email,
        password: preDetails.password,
        image: file.path,
        classId: classId,
        sectionId: sectionId,
        userId: id,
        ...body,
      })
    }

  ).then(
    result => {
      Users.findByIdAndUpdate(id, updatedUserInfo).then(
        result => {
          return res.status(201).json({ data: result })
        }
      )
    }
  ).catch(err => {
    return res.status(400).json(err)
  })

};

//EDIT STUDENTS DATA
const editStudentsInfo = async (req, res) => {
  const body = req.body;
  const { id } = req.params;

  var users = await Users.findByIdAndUpdate(id, body)
  try {
    return res.status(201).json({ message: "Successful!", data: users })
  } catch (err) {
    return res.status(400).json(err);
  }
}

const checkResult = (req, res) => {
  const { email } = req.params;
  Result.findOne(email).then(
    result => {
      if (!result) return res.status(401).json({ message: "You don't have any results yet, be patient" });
      return res.status(200).json({ result });
    }
  ).catch(
    err => {
      return res.status(400).json(err);
    }
  )
}

module.exports = {
  fetchStudentsInfo,
  uploadStudentsInfo,
  editStudentsInfo,
  checkResult,

  // checkReadingTimetable,
};
