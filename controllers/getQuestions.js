const Question = require("../database/models/questionSchema");

async function getQuestions(req, res) {
  const options = req.body;
  console.log(options);
  try {
    if (!options) {
      console.log("valid options not received");
      return;
    } else {
      const questions = await Question.find({
        author: options.author,
        subject: options.subject,
        year: options.year,
        class: options.standard,
      });
      res.json(questions);
      // console.log(questions[0].question);
    }
  } catch (err) {
    console.log(err.message);
  }
}

//////  DELETE QUESTION /////
async function deleteQuestion(req, res) {
  const id = req.body.id;
  console.log("id:", id);
  try {
    const response = await Question.deleteOne({ _id: id });
    console.log(response);
    res.json("Deleted Successfully");
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  getQuestions: getQuestions,
  deleteQuestion: deleteQuestion,
};
