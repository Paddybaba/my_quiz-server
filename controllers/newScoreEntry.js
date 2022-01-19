const ScoreCardEntry = require("../database/models/scoreCardSchema");

async function newScoreEntry(req, res) {
  const upload = req.body;
  console.log(upload);
  try {
    if (!upload.student_id || !upload.score || !upload.test) {
      console.log("valid options not received");
      return;
    } else {
      const response = await ScoreCardEntry.create(upload);
      res.json(upload.test);
    }
  } catch (err) {
    console.log(err.message);
  }
}

async function getScoreCardEntry(req, res) {
  const student_id = req.body.student_id;
  try {
    const response = await ScoreCardEntry.find({ student_id: student_id });
    console.log(response);
    res.json(response);
  } catch (e) {
    console.log(e);
  }
}
module.exports = {
  newScoreEntry: newScoreEntry,
  getScoreCardEntry: getScoreCardEntry,
};
