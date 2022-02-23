const mongoose = require("mongoose");

const Users = mongoose.model(
  "People_Model",
  new mongoose.Schema(
    {
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
      studentId: { type: String },
      classId: { type: String },
      sectionId: { type: String },
      blackId: { type: Boolean },
      suspended: { type: Boolean },
      resetToken: { type: String },
      resetTokenExpiration: { type: String },
    },
    {
      timestamps: true,
    }
  )
);

const Assignment = mongoose.model(
  "Assignment_portal",
  new mongoose.Schema(
    {
      title: { type: String, required: true },
      description: { type: String, required: true },
      image: { type: String },
      content: { type: String, required: true },
    },
    {
      timestamps: true,
    }
  )
);

const Notice = mongoose.model(
  "Notice_portal",
  new mongoose.Schema(
    {
      title: {
        type: String,
        required: [true, "Title for this notice hasn't been supplied"],
      },
      description: { type: String },
      image: { type: String },
      content: {
        type: String,
        required: [true, "No content provided for this notice."],
      },
    },
    {
      timestamps: true,
    }
  )
);

const Register = mongoose.model(
  "Registered_students",
  new mongoose.Schema(
    {
      passport: {
        type: String,
        required: true,
      },
      fullname: {
        type: String,
        required: [true, "Please provide your fullname"],
      },
      age: {
        type: String,
        required: true,
      },
      dateOfBirth: {
        type: String,
        required: true,
      },
      nameOfFormerSchool: {
        type: String,
        required: true,
      },
      stateOfOrigin: {
        type: String,
        required: true,
      },
      localGovernment: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
      },
      yearOfEntry: {
        type: String,
        required: true,
      },
      religion: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      nationality: {
        type: String,
        required: true,
      },
      sex: {
        type: String,
        required: true,
      },

      nextOfKin: {
        type: String,
        required: true,
      },
      relationshipWithKin: {
        type: String,
        required: true,
      },
      numberOfSiblings: {
        type: String,
        required: true,
      },
      nextOfKinPhone: {
        type: String,
        required: true,
      },
      nextOfKinAddress: {
        type: String,
        required: true,
      },
      genderOfSiblings: {
        type: String,
        required: true,
      },
      placeAmongSiblings: {
        type: String,
        required: true,
      },
      favouritSubject: {
        type: String,
        required: true,
      },
      email: {
        type: String,
      },
      sponsor: {
        type: String,
        required: true,
      },
      sponsorsPhone: {
        type: String,
        required: true,
      },
      relationshipWithSponsor: {
        type: String,
        required: true,
      },
      sponsorEmail: {
        type: String,
      },
      classOfEntry: {
        type: String,
        required: true,
      },
      sponsorAddress: {
        type: String,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  )
);

const Blog = mongoose.model(
  "School_blog",
  new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
      },
      image: {
        type: String,
      },
      content: {
        type: String,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  )
);

module.exports = {
  Users,
  Assignment,
  Notice,
  Register,
  Blog,
};
