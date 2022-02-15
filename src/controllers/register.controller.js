const { sendMail } = require("../../config/_mail");
const { Register } = require("../modules/app.model");

const postRegisteration = (req, res) => {
  const body = req.body;
  var register = new Register({
    ...body,
  });
  register.save();
  var response = sendMail({
    to: register.email,
    subject: "Registration for FL Schools",
    html: `Dear ${register.fullname}, Your reistration form has been successfully submitted to the school portal`,
  });
  response;
  return res.status(201).json({
    message: `Sucessfully submitted your data ${body.fullname}`,
    data: register,
  });
};

const getSingleRegistration = (req, res) => {
  const { id } = req.params;
  Register.findById(id)
    .then((registeredStudent) => {
      if (registeredStudent === null || !registeredStudent)
        return res.status(400).send("This user hasn't been registered");
      return res.status(200).json({
        message: "Successfully gotten your registration details",
        data: registeredStudent,
      });
    })
    .catch((err) => {
      return res.status(400).json(err);
    });
};

const editRegisteredStudent = (req, res) => {
  const { id } = req.params;
  const body = req.body;
  Register.findByIdAndUpdate(id, body)
    .then((updatedInfo) => {
      return res.status(201).json({
        message: "Your personal data has been successfully updated",
        data: updatedInfo,
      });
    })
    .then((result) => {
      var response = sendMail({
        to: body.email,
        subject: "Registration for FL Schools",
        html: `Dear ${body.fullname}, Your reistration form has been successfully updated and  submitted to the school portal`,
      });
      response;
    })
    .catch((err) => {
      return res.status(400).json(err);
    });
};

module.exports = {
  postRegisteration,
  getSingleRegistration,
  editRegisteredStudent,
};
