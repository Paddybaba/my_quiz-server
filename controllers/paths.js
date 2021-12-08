const express = require("express");
const router = express.Router();
const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const studentRegistrationHandler = require("./studentRegister");
const studentLoginHandler = require("./loginController");
const teacherRegistrationHandler = require("./teacherRegister");
const teacherLoginHandler = require("./loginTeacher");
const questionHandler = require("./getQuestions");
const questionAdder = require("./addQuestion");
const authorHandler = require("./getAuthor");
const teacherRegistrationHandler2 = require("./teacherRegister2");
const activateTeacherHandler = require("./activateTeacher");
const { validateToken } = require("../middlewares/jwt");

const jwt = require("jsonwebtoken");
let upload = multer({ storage: multer.memoryStorage() });
AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
});
const s3 = new AWS.S3();

const uploadToS3 = multer({
  storage: multerS3({
    s3: s3,
    bucket: "paddy-photo-bucket",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, `${Date.now().toString()}-${file.originalname}.jpeg`);
    },
  }),
});
router.get("/", (req, res) => {
  res.send("Hello i am listening for questions");
});
//////// STUDENT REGISTRATION ////

router.post("/registerStudent", (req, res) => {
  studentRegistrationHandler.registerStudent(req, res);
});
//////// STUDENT LOGIN //////////
router.post("/login", (req, res) => {
  studentLoginHandler.loginHandler(req, res);
});
////////// REGISTER  TEACHER  ////////
router.post("/registerTeacher", (req, res) => {
  teacherRegistrationHandler.registerTeacher(req, res);
});
////////// REGISTER  PENDING TEACHER  ////////
router.post("/registerTeacher2", (req, res) => {
  teacherRegistrationHandler2.registerTeacher(req, res);
});
///////// ACTIVATE TEACHER ////////
router.get("/api/activate", (req, res) => {
  activateTeacherHandler.activateTeacher(req, res);
});

/////////// LOGIN TEACHER ////////
router.post("/loginTeacher", (req, res) => {
  teacherLoginHandler.loginTeacher(req, res);
});
///////// ADD QUESTION ///////////
router.post("/addQuestion", uploadToS3.array("images"), (req, res) => {
  questionAdder.addQuestion(req, res);
});
///////// GET QUESTIOSN //////////
router.post("/getquest", (req, res) => {
  questionHandler.getQuestions(req, res);
});

////// GET AUTHORS /////////
router.post("/getauthors", (req, res) => {
  authorHandler.getAuthors(req, res);
});
module.exports = router;
