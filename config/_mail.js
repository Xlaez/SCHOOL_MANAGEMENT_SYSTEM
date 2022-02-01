var nodemailer = require("nodemailer");

const EMAIL_ACCOUNT = process.env.EMAIL_ACCOUNT ?? "futurepayafrica@gmail.com";
const EMAIL_KEY = process.env.EMAIL_KEY ?? "Futurelabs@123";

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_ACCOUNT,
    pass: EMAIL_KEY,
  },
});

exports.sendMail = function (data) {
  return transporter.sendMail({ ...data, from: "" });
};
