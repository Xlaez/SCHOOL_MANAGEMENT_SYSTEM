const express = require("express");
const multer = require("multer");
const path = require("path");
const compression = require('compression')
const morgan = require('morgan')
const { stream } = require('./public/stream')
const { urlencoded, json } = require("body-parser");
const { createWriteStream } = require("fs");
const { Mongo } = require("./config/_db");
const { header } = require("./middleware/_header");
const { authRouter } = require("./routes/auth.routes");
const { userRouter } = require("./routes/user.routes");
const { studentRouter } = require("./routes/student.routes");
const { staffRouter } = require("./routes/teacher.routes");
const { noticeRouthe } = require("./routes/notice.routes");
const { assignmentRouter } = require("./routes/assignments.routes");
const { fileFilter, fileStorage } = require("./config/_multer");
const { blogRouter } = require("./routes/blog.routes");
const { registrationRouthe } = require("./routes/registration.routes");
const { adminRouthe } = require("./routes/admin.routes");
const { complaintsRouter } = require("./routes/complaints.routes");
const { isAuth } = require("./middleware/_is_auth");
const { superAdminRoute } = require("./routes/superadmin.routes");
const { superAdmin } = require("./middleware/_is_super_admin");
const { isTeacher } = require("./middleware/_is_teacher");
const { storeRoute } = require("./routes/store.routes");
const { isSuspended } = require("./middleware/_is_suspended");
const { subjectsRouter } = require("./routes/subjects.routes");

const accessLogStream = createWriteStream(path.join(__dirname, 'logs', 'access.log'), { flags: 'a' })

const server = express();

server.use(morgan('combined', { stream: accessLogStream }));
server.use(compression())
server.set("view engine", "ejs")
server.use(urlencoded({ extended: true }));
server.use(json());
server.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);
server.use(header);

server.use("/api/auth", authRouter);
server.use("/api/user", [isAuth], userRouter);
server.use("/api/admin", [isAuth], adminRouthe);
server.use("/api/student", [isAuth], studentRouter);
server.use("/api/teacher", [isAuth], [isTeacher], staffRouter);
server.use("/api/notice", [isAuth], noticeRouthe);
server.use("/api/assignments", [isAuth], assignmentRouter);
server.use("/api/articles", blogRouter);
server.use("/api/register", registrationRouthe);
server.use('/api/complaints', complaintsRouter)
server.use('/api/superadmin', [isAuth], [superAdmin], superAdminRoute)
server.use('/api/store', [isAuth], storeRoute)
server.use('/api/subjects', [isAuth], subjectsRouter)
server.use(express.static(path.join(__dirname, "assets", "images")));
server.use(express.static(path.join(__dirname, "view")));
server.use(express.static(path.join(__dirname, "public")));

server.get('/', (req, res) => {
  res.sendFile(__dirname + 'public', '/index.html')
})

const port = process.env.PORT || 8080;
var connection = server.listen(port);

Mongo.then(function (result) {
  console.log(`=========>Mongo client connected at ${port}`);
  const io = require('./src/mixins/connection.socket').init(connection)
  // io.of('/stream').on('connection', stream)
  io.on('connection', (stream) => {
    console.log('=======>Client connected')
  })
}).catch((err) => {
  console.log(`=========> ${err}`);
});
