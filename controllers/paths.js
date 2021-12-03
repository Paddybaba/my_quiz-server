const express = require("express");
const router = express.Router();
const multer = require("multer");
const studentRegistrationHandler = require("./studentRegister");
const studentLoginHandler = require("./loginController");
const teacherRegistrationHandler = require("./teacherRegister");
const teacherLoginHandler = require("./loginTeacher");
const questionHandler = require("./getQuestions");
const questionAdder = require("./addQuestion");
const authorHandler = require("./getAuthor");
const { validateToken } = require("../middlewares/jwt");

const jwt = require("jsonwebtoken");
let upload = multer({ storage: multer.memoryStorage() });
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
/////////// LOGIN TEACHER ////////
router.post("/loginTeacher", (req, res) => {
  teacherLoginHandler.loginTeacher(req, res);
});
///////// ADD QUESTION ///////////
router.post("/addQuestion", upload.single("quest_image"), (req, res) => {
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
