const mongoose = require("mongoose");

const Users = mongoose.model(
  "People_Model",
  new mongoose.Schema({
    fullname: { type: String, required: [true, "fill out this input area"] },
    email: { type: String, required: [true, "enter a valid email "] },
    password: { type: String, required: [true, "enter a password "] },
    role: { type: String },
    image: { type: String },
    phone: { type: String },
    position: { type: String },
    class: { type: String },
    subjects: [],
    timetable: [],
    result: [],
    students: [],
    classId: { type: String },
    sectionId: { type: String },
    blackId: { type: Boolean },
    suspended: { type: Boolean },
    resetToken: { type: String },
    resetTokenExpiration: { type: String },
  })
);

module.exports = {
  Users,
};
