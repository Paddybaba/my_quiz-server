const mongoose = require("mongoose");

const scoreCardSchema = new mongoose.Schema({
  test: {
    type: Object,
    required: true,
  },
  score: {
    type: Object,
    required: true,
  },
  student_id: {
    type: String,
    required: true,
  },
});

const ScoreCardEntry = mongoose.model("ScoreCardEntry", scoreCardSchema);

module.exports = ScoreCardEntry;
