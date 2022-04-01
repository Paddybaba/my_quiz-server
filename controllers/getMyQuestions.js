const Question = require("../database/models/questionSchema");

async function getMyQuestions(req, res) {
  const { author_email } = req.body;
  console.log("teacher :", author_email);
  try {
    if (!author_email) {
      console.log("valid options not received");
      return;
    } else {
      const questions = await Question.find({
        author_email: author_email,
      });
      res.json(questions);
      console.log("number of questions found :", questions.length);
    }
  } catch (err) {
    console.log(err.message);
  }
}

module.exports = {
  getMyQuestions: getMyQuestions,
};
