const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const studentSchema = new mongoose.Schema({
  student_id: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  student_name: {
    type: String,
  },
  token: {
    type: String,
  },
  photo: {
    type: String,
  },
  savedTest: {
    type: Object,
  },
});

// studentSchema.methods.generateToken = async function () {
//   try {
//     let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY_JWT);
//     return token;
//   } catch (err) {
//     console.log(err);
//   }
// };
const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
