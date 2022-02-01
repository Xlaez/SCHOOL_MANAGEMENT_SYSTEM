var nodemailer = require("nodemailer");

const EMAIL_ACCOUNT = "kamounation@gmail.com";
const EMAIL_KEY = "kamoucares";

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
