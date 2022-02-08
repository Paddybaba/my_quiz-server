const questionBank = require("../database/models/questionBank");
const QuestionBank = require("../database/models/questionBank");

async function publishQuestionBank(req, res) {
  const qbProps = req.body;

  try {
    if (qbProps.teacher_id.length > 0) {
      const writeresult = await QuestionBank.create(qbProps);
      console.log(writeresult);
      res.status(200).json("Success");
    } else {
      res.status(400).json("Data insufficient");
    }
  } catch (err) {
    console.log(err.message);
    res.json("Error");
  }
}

async function getPublishedTest(req, res) {
  try {
    const result = await questionBank.find();
    res.json(result);
    // console.log(result);
  } catch (err) {
    console.log(err);
  }
}
module.exports = {
  publishQuestionBank: publishQuestionBank,
  getPublishedTest: getPublishedTest,
};
