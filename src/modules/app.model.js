const mongoose = require("mongoose");

const Users = mongoose.model(
  "People_Model",
  new mongoose.Schema(
    {
      fullname: { type: String, required: [true, "fill out this input area"] },
      email: { type: String, required: [true, "enter a valid email "] },
      password: { type: String, required: [true, "enter a password "] },
      role: { type: String },
      resetToken: { type: String },
      resetTokenExpiration: { type: String },
    },
    {
      timestamps: true,
    }
  )
);

const Teacher = mongoose.model(
  "Teacher_Model",
  new mongoose.Schema(
    {
      name: { type: String, required: [true, "fill out this input area"] },
      email: { type: String, required: [true, "enter a valid email"] },
      password: { type: String },
      class: { type: String },
      classId: { type: String },
      sectionId: { type: String },
      teacherId: { type: String },
      image:{type:String},
      resetToken: { type: String },
      resetTokenExpiration: { type: String },
    },
    {
      timestamps: true
    }
  )
)


const Admin = mongoose.model(
  "Admin_Model",
  new mongoose.Schema(
    {
      name: { type: String, required: [true, "fill out this input area"] },
      email: { type: String, required: [true, "enter a valid email"] },
      password: { type: String, required: [true, "enter  a password"] },
      adminId: { type: String },
      adminType: { type: String },
      image: { type: String },
      resetToken: { type: String },
      resetTokenExpiration: { type: String },
    },
    {
      timestamps: true
    }
  )
)

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
      admitted: {
        type: Boolean,
        default: false,
      },
      image: {
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
        // required: true,
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
        // required: true,
      },
      nextOfKinPhone: {
        type: String,
        required: true,
      },
      nextOfKinAddress: {
        type: String,
        required: true,
      },

      placeAmongSiblings: {
        type: String,
        required: true,
      },
      favouriteSubject: {
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
      sponsorsContact: {
        type: String,
        // required: true,
      },
      sponsorsName: {
        type: String,
        required: true,
      },
      relationshipWithSponsor: {
        type: String,
        // required: true,
      },
      sponsorEmail: {
        type: String,
      },
      classOfEntry: {
        type: String,
        required: true,
      },
      class: {
        type: String,
      },

      sectionId: {
        type: String,
      },
      classId: {
        type: String,
      },
      teacherId: {
        type: String,
      },
      sponsorAddress: {
        type: String,
        // required: true,
      },
      relationShipStatus: {
        type: String,
        required: true,
      },
      parentRelationShipStatus: {
        type: String,
      }
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
      author: {
        type: String,
      }
      ,
      userId: String
    },
    {
      timestamps: true,
    }
  )
);

const Result = mongoose.model(
  "Result_portal",
  new mongoose.Schema(
    {
      title: {
        type: String,
        required: [true, "Title for this notice hasn't been supplied"],
      },
      name: {
        type: String
      },
      content: [],
      position: {
        type: String, required: true
      },
      email: {
        type: String,
        required: true
      },
      remark: {
        type: String,
        required: true,
      },
      date: {
        type: String,
        required: true
      },
      average: {
        type: String, required: true
      },
      classAverage: {
        type: String,
        required: true,
      },
      adminRemark: {
        type: String,
      },

    },
    {
      timestamps: true,
    }
  )
);

const Drafts = mongoose.model(
  "Drafts",
  new mongoose.Schema(
    {
      header: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
      userId: {
        type: String,
        required: true
      }
    },
    {
      timestamps: true,
    }
  )
);

const Subjects = mongoose.model(
  "Students_subjects",
  new mongoose.Schema({
    subjects: { type: Array, required: true },
    userId: { type: String }
  })
)

module.exports = {
  Users,
  Assignment,
  Notice,
  Register,
  Blog,
  Result,
  Drafts,
  Subjects,
  Teacher,
  Admin
};
