const { Users, Notice, Register, Teacher, Admin } = require("../modules/app.model");
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
var TEACHER_J_1 = process.env.ID_TEACHER_JUNIOR1
var TEACHER_J_2 = process.env.ID_TEACHER_JUNIOR2
var TEACHER_J_3 = process.env.ID_TEACHER_JUNIOR3
var TEACHER_S_1 = process.env.ID_TEACHER_SENIOR1
var TEACHER_S_2 = process.env.ID_TEACHER_SENIOR2
var TEACHER_S_3 = process.env.ID_TEACHER_SENIOR3

const GetAdminData = async (req, res) => {
  var { id } = req.params;
  var admin = await Admin.findById(id);
  if (!admin) return res.status(500).json({ message: "Admin doesn't exist" })
  return res.status(200).json({ image: admin.image, name: admin.name, email: admin.email, adminType: admin.adminType });
}

const AdmitStudent = (req, res) => {
  Register.findById(req.params.id).then(

    student => {
      let teacherId;
      let sectionId;
      let classId;
      if (student.classOfEntry === 'junior1' || student.classOfEntry == 'junior2' || student.classOfEntry === 'junior3') {
        sectionId = JUNIOR_ID
        classId = JUNIOR_ID
        if (dent.classOfEntry === 'junior1') {
          classId = classId.concat(JUNIOR1)
          teacherId = TEACHER_J_1
        } else if (student.classOfEntry === 'junior2') {
          classId = classId.concat(JUNIOR2)
          teacherId = TEACHER_J_2
        } else if (student.classOfEntry === 'junior3') {
          teacherId = TEACHER_J_3
          classId = classId.concat(JUNIOR3)
        }
      }
      if (student.classOfEntry === 'senior1' || student.classOfEntry == 'senior2' || student.classOfEntry == 'senior3') {

        sectionId = SENIOR_ID
        classId = SENIOR_ID
        if (student.classOfEntry === 'senior1') {
          teacherId = TEACHER_S_1
          classId = classId.concat(SENIOR1)
        } else if (student.classOfEntry === 'senior2') {
          teacherId = TEACHER_S_2
          classId = classId.concat(SENIOR2)
        } else if (student.classOfEntry === 'senior3') {
          teacherId = TEACHER_S_3
          classId = classId.concat(SENIOR3)
        }
      }
      student.admitted = true;
      student.class = student.classOfEntry;
      student.classId = classId;
      student.sectionId = sectionId;
      student.teacherId = teacherId;
      student.save();
      return res.status(201).json({ message: "student admitted" })
    }
  ).catch(
    err => {
      return res.status(500).send("An error occured", err);
    }
  )
}

const AdmitStudentByEmail = (req, res) => {
  Register.findOne({ email: req.body.email }).then(

    student => {
      let teacherId;
      let sectionId;
      let classId;
      if (student.classOfEntry === 'junior1' || student.classOfEntry == 'junior2' || student.classOfEntry === 'junior3') {
        sectionId = JUNIOR_ID
        classId = JUNIOR_ID
        if (dent.classOfEntry === 'junior1') {
          classId = classId.concat(JUNIOR1)
          teacherId = TEACHER_J_1
        } else if (student.classOfEntry === 'junior2') {
          classId = classId.concat(JUNIOR2)
          teacherId = TEACHER_J_2
        } else if (student.classOfEntry === 'junior3') {
          teacherId = TEACHER_J_3
          classId = classId.concat(JUNIOR3)
        }
      }
      if (student.classOfEntry === 'senior1' || student.classOfEntry == 'senior2' || student.classOfEntry == 'senior3') {

        sectionId = SENIOR_ID
        classId = SENIOR_ID
        if (student.classOfEntry === 'senior1') {
          teacherId = TEACHER_S_1
          classId = classId.concat(SENIOR1)
        } else if (student.classOfEntry === 'senior2') {
          teacherId = TEACHER_S_2
          classId = classId.concat(SENIOR2)
        } else if (student.classOfEntry === 'senior3') {
          teacherId = TEACHER_S_3
          classId = classId.concat(SENIOR3)
        }
      }
      student.admitted = true;
      student.class = student.classOfEntry;
      student.classId = classId;
      student.sectionId = sectionId;
      student.teacherId = teacherId;
      student.save();
      return res.status(201).json({ message: "student admitted" })
    }
  ).catch(
    err => {
      return res.status(500).send("An error occured", err);
    }
  )
}


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

const AddTeacher = async (req, res) => {
  const body = req.body;
  const image = req.file;
  if (!req.file) return res.status(500).json({ message: "No image provided" })
  var check = await Teacher.findOne({ email: body.email });
  if (check) return res.status(500).json({ message: "Already registered in database" })
  let teacherId;
  let sectionId;
  let classId;
  if (body.class === 'junior1' || body.class == 'junior2' || body.class === 'junior3') {
    sectionId = JUNIOR_ID
    classId = JUNIOR_ID
    if (body.class === 'junior1') {
      classId = classId.concat(JUNIOR1)
      teacherId = TEACHER_J_1
    } else if (body.class === 'junior2') {
      classId = classId.concat(JUNIOR2)
      teacherId = TEACHER_J_2
    } else if (body.class === 'junior3') {
      teacherId = TEACHER_J_3
      classId = classId.concat(JUNIOR3)
    }
  }
  if (body.class === 'senior1' || body.class == 'senior2' || body.class == 'senior3') {

    sectionId = SENIOR_ID
    classId = SENIOR_ID
    if (body.class === 'senior1') {
      teacherId = TEACHER_S_1
      classId = classId.concat(SENIOR1)
    } else if (body.class === 'senior2') {
      teacherId = TEACHER_S_2
      classId = classId.concat(SENIOR2)
    } else if (body.class === 'senior3') {
      teacherId = TEACHER_S_3
      classId = classId.concat(SENIOR3)
    }
  }

  var teacher = new Teacher({
    ...body,
    classId: classId,
    sectionId: sectionId,
    teacherId: teacherId,
    image: image.path
  });
  teacher = await teacher.save();
  return res.status(201).json({ message: "teacher addded successfully", data: teacher });
}


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
  AdmitStudent,
  AddTeacher,
  GetAdminData,
  AdmitStudentByEmail
};
