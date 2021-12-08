const mongoose = require("mongoose");

const pendingTeacherSchema = new mongoose.Schema({
  teacher_id: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  teacher_name: {
    type: String,
  },
  city: {
    type: String,
  },
  school: {
    type: String,
  },
});

const pendingTeacher = mongoose.model("pendingTeacher", pendingTeacherSchema);

module.exports = pendingTeacher;
