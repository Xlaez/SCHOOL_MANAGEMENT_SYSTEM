const { connect } = require("mongoose");
const Mongo = connect("mongodb://0.0.0.0:27017");

module.exports.Mongo = Mongo;
