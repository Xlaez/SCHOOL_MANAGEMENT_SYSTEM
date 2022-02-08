const express = require("express");
const { urlencoded, json } = require("body-parser");
const { Mongo } = require("./config/_db");
const { header } = require("./middleware/_header");
const { authRouter } = require("./routes/auth.route");
const { userRouter } = require("./routes/user.route");
const { studentRouter } = require("./routes/student.route");
const { staffRouter } = require("./routes/staff.route");

const server = express();
server.use(urlencoded({ extended: true }));
server.use(json());
server.use("/auth", authRouter);
server.use("/user", userRouter);
server.use("/student", studentRouter);
server.use("/staff", staffRouter);
server.use(header);

Mongo.then(function (result) {
  console.log(`=========>Mongo client connected at ${port}`);
}).catch((err) => {
  console.log(`=========> ${err}`);
});

const port = process.env.PORT || 8080;

server.listen(port);
