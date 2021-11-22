const jwt = require("jsonwebtoken");
const Student = require("../database/models/studentSchema");
const bcryt = require("bcryptjs");

async function registerStudent(req, res) {
  try {
    const { student_name, student_id, password } = req.body;

    const studentExists = await Student.findOne({ student_id: student_id });
    if (!studentExists) {
      const hash = await bcryt.hash(password, 10);
      const writeresult = await Student.create({
        student_id: student_id,
        student_name: student_name,
        password: hash,
      });
      console.log("Student Added successfully :", writeresult._id.toString());
      res.json("Added");
    } else {
      res.send("This id is already registered");
    }
  } catch (err) {
    console.log(err.message);
  }
}

module.exports = {
  registerStudent: registerStudent,
};
