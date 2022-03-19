let checkMail;
let checkPassword;
const isEmail = (req, res, next) => {
  var body = req.body;
  var user = body.email;
  checkMail = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,7})$/;

  if (user.match(checkMail)) {
    next();
  } else {
    return res.status(422).json({ message: "Incorrect email fields" });
  }
};

const isPassword = (req, res, next) => {
  var body = req.body;
  var user = body.password;
  checkPassword = /^([a-zA-Z0-9_\-\(\)\%\@\$\+\.]){8,30}$/;
  if (user.match(checkPassword)) {
    next();
  } else {
    return res.status(422).json({
      message:
        "correct password field,must not shorter than 6 characters and not longer than 14, can contain _, -, (, ), %, @, $, +",
    });
  }
};

module.exports = {
  isEmail,
  isPassword,
};
