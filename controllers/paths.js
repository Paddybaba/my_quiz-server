const express = require("express");
const router = express.Router();
const studentRegistrationHandler = require("./studentRegister");
const studentLoginHandler = require("./loginController");
const questionHandler = require("./getQuestions");
const authorHandler = require("./getAuthor");
const { validateToken } = require("../middlewares/jwt");

const jwt = require("jsonwebtoken");

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

///////// GET QUESTIOSN //////////
router.post("/getquest", (req, res) => {
  questionHandler.getQuestions(req, res);
});

////// GET AUTHORS /////////
router.post("/getauthors", (req, res) => {
  authorHandler.getAuthors(req, res);
});
module.exports = router;
