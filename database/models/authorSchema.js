const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
  authorname: {
    type: String,
    required: true,
  },
  teacher_id : {
    type: String,
    required: true
  }
});

const Author = mongoose.model("Author", authorSchema);

module.exports = Author;
