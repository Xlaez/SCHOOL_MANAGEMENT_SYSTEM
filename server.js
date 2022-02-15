const express = require("express");
const multer = require("multer");
const path = require("path");
const { urlencoded, json } = require("body-parser");
const { Mongo } = require("./config/_db");
const { header } = require("./middleware/_header");
const { authRouter } = require("./routes/auth.routes");
const { userRouter } = require("./routes/user.routes");
const { studentRouter } = require("./routes/student.routes");
const { staffRouter } = require("./routes/staff.routes");
const { noticeRouthe } = require("./routes/notice.routes");
const { assignmentRouter } = require("./routes/assignments.routes");
const { fileFilter, fileStorage } = require("./config/_multer");
const { blogRouter } = require("./routes/blog.routes");
const { registrationRouthe } = require("./routes/registration.routes");
const { adminRouthe } = require("./routes/admin.routes");

const server = express();
server.use(urlencoded({ extended: true }));
server.use(json());
server.use("/auth", authRouter);
server.use("/user", userRouter);
server.use("/admin", adminRouthe);
server.use("/student", studentRouter);
server.use("/staff", staffRouter);
server.use("/notice", noticeRouthe);
server.use("/assignments", assignmentRouter);
server.use("/articles", blogRouter);
server.use("/register", registrationRouthe);
server.use(header);
server.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);
server.use(express.static(path.join(__dirname, "assets", "images")));

Mongo.then(function (result) {
  console.log(`=========>Mongo client connected at ${port}`);
}).catch((err) => {
  console.log(`=========> ${err}`);
});

const port = process.env.PORT || 8080;

server.listen(port);
