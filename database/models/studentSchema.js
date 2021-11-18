const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const studentSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  student: {
    type: String,
  },
});

studentSchema.methods.generateToken = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
    return token;
  } catch (err) {
    console.log(err);
  }
};
const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
