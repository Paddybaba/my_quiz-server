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
const studentHandler = require("./getStudent");
const teacherRegistrationHandler2 = require("./teacherRegister2");
const activateTeacherHandler = require("./activateTeacher");
const newScoreEntryHabdler = require("./newScoreEntry");
const getMyQuestions = require("./getMyQuestions");
const questionBankHandler = require("./publishQuestionBank");
const verifyToken = require("../middlewares/auth");

const jwt = require("jsonwebtoken");
const questionBank = require("../database/models/questionBank");
const { verify } = require("jsonwebtoken");
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
//////// GET QUESTIONS FOR TEACHER ////
router.post("/getmyquestions", (req, res) => {
  getMyQuestions.getMyQuestions(req, res);
});
/////// DELETE QUESTION ///////
router.post("/deletequestion", (req, res) => {
  questionHandler.deleteQuestion(req, res);
});
///////// QUESTION BANK ///////
router.post("/publishTest", (req, res) => {
  questionBankHandler.publishQuestionBank(req, res);
});
router.post("/getpublishedtest", (req, res) => {
  questionBankHandler.getPublishedTest(req, res);
});
////// GET AUTHORS /////////
router.post("/getauthors", verifyToken, (req, res) => {
  authorHandler.getAuthors(req, res);
});

/////// SCORE and TEST ///////
router.post("/newScoreEntry", (req, res) => {
  newScoreEntryHabdler.newScoreEntry(req, res);
});
router.post("/getScoreCardEntry", (req, res) => {
  newScoreEntryHabdler.getScoreCardEntry(req, res);
});

////// TESTING ////////
router.post("/welcome", verifyToken, (req, res) => {
  res.status(200).json("Welcome you are verified !!!");
});

router.post("/getStudent", verifyToken, (req, res) => {
  studentHandler.getStudent(req, res);
});

// function parseJwt(token) {
//   if (!token) {
//     return;
//   }
//   const base64Url = token.split(".")[1];
//   const base64 = base64Url.replace("-", "+").replace("_", "/");
//   return base64;
// }

module.exports = router;
