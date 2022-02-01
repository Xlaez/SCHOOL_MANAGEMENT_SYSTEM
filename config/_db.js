const { connect } = require("mongoose");
const Mongo = connect(
  "mongodb+srv://default:new_user2@studentform.o0has.mongodb.net/a2Default?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

module.exports.Mongo = Mongo;
