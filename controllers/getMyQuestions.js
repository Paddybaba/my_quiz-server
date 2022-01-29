const Question = require("../database/models/questionSchema");

async function getMyQuestions(req, res) {
  const { author } = req.body;
  console.log("teacher :", author);
  try {
    if (!author) {
      console.log("valid options not received");
      return;
    } else {
      const questions = await Question.find({
        author: author,
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
