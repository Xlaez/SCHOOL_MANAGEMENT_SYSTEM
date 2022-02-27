const pdf = require('pdfkit');
const path = require('path')
const fs = require('fs')
const { sendMail } = require("../../config/_mail");
const { Register, Users } = require("../modules/app.model");

const postRegisteration = async (req, res) => {
  const body = req.body;
  const image = req.file;
  Register.findOne({ email: body.email }).then(
    data => {
      return res.status(400).json({ message: "Already submitted your data", data: data })

    }
  )
  var register = new Register({
    ...body,
    image: image.path
  });
  register = await register.save();
  var response = sendMail({
    to: register.email,
    subject: "Registration for FL Schools",
    html: `Dear ${register.fullname}, Your reistration form has been successfully submitted to the school portal`,
  });
  response;
  try {
    return res.status(201).json({
      message: `Sucessfully submitted your data ${body.fullname}`,
      data: register,
      regId: register._id
    });
  } catch (err) {
    return res.status(400).json(err);
  }
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

const sendBiodata = (req, res) => {
  const { id } = req.params;
  var biodataName = 'bio-' + id + '.pdf'
  var BiodataPath = path.join('assets', 'data', biodataName)
  Register.findById(id).then(data => {
    var pdfDoc = new pdf();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename="' + biodataName + ' "')
    // pdf.pipeline();
    pdfDoc.pipe(fs.createWriteStream(BiodataPath))
    pdfDoc.pipe(res)
    pdfDoc.addContent(data)
    pdfDoc.end();

  }).catch(err => { return res.status(400).json(err) });
}

module.exports = {
  postRegisteration,
  getSingleRegistration,
  editRegisteredStudent,
  sendBiodata
};
