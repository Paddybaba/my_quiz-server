const Question = require("../database/models/questionSchema");
const Author = require("../database/models/authorSchema");

async function addQuestion(req, res) {
  const question = req.body;
  console.log(question);
  try {
    const writeresult = await Question.create(question);

    if (writeresult) {
      const authorExists = await Author.findOne({
        authorname: question.author,
      });
      if (!authorExists) {
        await Author.create({ authorname: question.author });
      } else {
        console.log("author is already present in database");
      }

      res.status(200).json("Question added successfully");
    } else {
      console.log("Question not added");
    }
  } catch (err) {
    console.log(err.message);
  }
}

module.exports = {
  addQuestion: addQuestion,
};
