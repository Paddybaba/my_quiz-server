const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

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
  city : {
      type: String
  },
  school : {
    type: String
}
});

pendingTeacherSchema.methods.generateToken = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY_JWT);
    return token;
  } catch (err) {
    console.log(err);
  }
};
const pendingTeacher = mongoose.model("pendingTeacher", pendingTeacherSchema);

module.exports = pendingTeacher;
