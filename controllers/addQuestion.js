const Question = require("../database/models/questionSchema");

async function addQuestion(req, res) {
  const question = req.body;
  console.log(question);
  try {
    const writeresult = await Question.create({ question });
    if (writeresult) res.status(200).json("Question added successfully");
    else {
      console.log("Question not added");
    }
  } catch (err) {
    console.log(err.message);
  }
}

module.exports = {
  addQuestion: addQuestion,
};
