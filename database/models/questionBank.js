const mongoose = require("mongoose");

const questionBankSchema = new mongoose.Schema({
  teacher_id: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  
  author: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
  },
  standard:{
    type:String
  },
  published: {
    type: Date,
  }
});

const questionBank = mongoose.model("questionBank", questionBankSchema);

module.exports = questionBank;
