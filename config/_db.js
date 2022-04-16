const { connect } = require("mongoose");
require('dotenv').config();
//Test connection
// const Mongo = connect("mongodb://0.0.0.0:27017");
//Production connection
const Mongo  = connect(process.env.MONGO_URl, { useNewUrlParser: true, useUnifiedTopology: true })

module.exports.Mongo = Mongo;
