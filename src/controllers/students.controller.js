const { Users, Result } = require("../modules/app.model");

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
  checkResult,
};
