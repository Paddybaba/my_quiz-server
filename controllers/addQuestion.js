const Question = require("../database/models/questionSchema");
const Author = require("../database/models/authorSchema");
///////////////////
// 1. receive formdata from frontend
// 2. create question object with empty images
// 3. upload imahges to s3
// 4. receive and add the locations to question object
// 5. upload question to database
//////////////////////
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
