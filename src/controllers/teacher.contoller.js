const { Users, Assignment, Result, Drafts, Subjects, Teacher, Register } = require("../modules/app.model");
require("dotenv").config();

const fetchTeachersData = (req, res) => {
  const { id } = req.params;
  Teacher.findById(id)
    .then((teachersInfo) => {
      if (teachersInfo === null || !teachersInfo)
        return res
          .status(500)
          .json({ message: "Couldn't get teachers information" });
      return res.status(200).json({
        message: `Found ${teachersInfo.name} data`,
        data: teachersInfo
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

const fetchTeachersStudents = (req, res) => {
  const { id } = req.params
  if (!id) return res.status(403).send("Rejected!")
  Register.find({ teacherId: id }).then(
    data => {
      if (data == null) return res.status(400).send("error")
      return res.status(200).json({ data })
    }
  ).catch(err => {
    return res.status(400).json(err)
  })
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

const setSubjects = async (req, res) => {
  const body = req.body;
  const subjects = await Subjects.create({
    ...body,
  })
  if (!subjects) return res.status(500).json({ message: "An error occured" })
  return res.status(201).json({ data: subjects })
}

const isSubjectSet = async (req, res) => {
  var confirm = await Subjects.findOne({ teacherId: req.params.id });

  if (!confirm) return res.status(500).json({ message: "This teacher has no access" });

  return res.status(200).json({ data: "ok", confirm });
}

const subjects = async (req, res) => {
  var confirm = await Subjects.findOne({ teacherId: req.params.id });

  if (!confirm) return res.status(500).json({ message: "This teacher has no access" });

  return res.status(200).json([confirm]);
}


module.exports = {
  fetchTeachersData,
  uploadTeachersInfo,
  fetchTeachersStudents,
  postAssignment,
  createStudentresult,
  editResult,
  setSubjects,
  isSubjectSet,
  subjects
};
