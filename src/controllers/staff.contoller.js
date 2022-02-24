const { Users, Assignment, Result, Drafts } = require("../modules/app.model");
require("dotenv").config();

const fetchTeachersData = (req, res) => {
  const { id } = req.params;
  Users.findOne({ _id: id })
    .then((teachersInfo) => {
      if (teachersInfo === null || !teachersInfo)
        return res
          .status(400)
          .json({ message: "Couldn't get teachers information" });
      return res.status(200).json({
        message: `Found ${teachersInfo.fullname} data`,
        data: teachersInfo,
      });
    })
    .catch((err) => {
      return res.status(400).json(err);
    });
};

const uploadTeachersInfo = (req, res) => {
  const body = req.body;
  const { id } = req.params;
  Users.findById(id)
    .then((teacher) => {
      if (teacher === null || !teacher)
        return res
          .status(400)
          .json({ message: "Couldn't identifier this user!" });

      var preDetails = {
        fullname: teacher.fullname,
        email: teacher.email,
        password: teacher.password,
      };

      var updatedTeacherInfo = new Users({
        fullname: preDetails.fullname,
        email: preDetails.email,
        password: preDetails.password,
        ...body,
      });
      updatedTeacherInfo.save();
      return res.status(201).json({
        message: "Teachers data updated!",
        data: updatedTeacherInfo,
      });
    })
    .catch((err) => {
      return res.status(400).json(err);
    });
};

// remember to add teachers id to the students.
const fetchTeachersStudents = (req, res) => {
  const { id } = req.params;
  Users.find({ _id: id })
    .then((students) => {
      if (!students || students === null)
        return res.status(400).json({
          message:
            "There are no students for thos teacher, please check the teachers id",
        });
      return res.status(200).json({
        message: "Successfully gotten students for the teacher",
        data: students,
      });
    })
    .catch((err) => {
      return res.status(400).json(err);
    });
};

const postAssignment = async (req, res) => {
  const body = req.body;
  var assignment = new Assignment({
    ...body,
  });
  assignment = await assignment.save();
  try {
    return res
      .status(201)
      .json({ message: "Successfully posted an assignment", data: assignment });
  } catch (err) {
    return res.status(400).json(err);
  }
};

const createStudentresult = async (req, res) => {
  const body = req.body;
  const email = req.body.email
  var isUser = await Users.findOne({ email: email });
  if (!isUser) return res.status(400).json({
    message: "Try loggin in again"
  })
  var name = isUser.name;
  console.log(name)
  try {
    var result = new Result({
      ...body,
      name: name,
      studentId: isUser.studentId,
      email: email
    })
    result = await result.save()
    return res.status(201).json({ data: result });
  } catch (err) {
    return res.status(401).json(err)
  }
}

const editResult = async (req, res) => {
  const body = req.body;
  var email = body.email;
  var result = await Result.findOneAndUpdate(email, body);
  return res.status(201).json({ message: 'result updated successfully', data: result });
}



module.exports = {
  fetchTeachersData,
  uploadTeachersInfo,
  fetchTeachersStudents,
  postAssignment,
  createStudentresult,
  editResult,

};
