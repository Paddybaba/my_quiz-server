const jwt = require("jsonwebtoken");
const Student = require("../database/models/studentSchema");

const getStudent = async (req, res) => {
  const token = req.headers["mcq-access-token"];
  const payload = jwt.decode(token);
  console.log(payload);
  try {
    const student = await Student.findOne({ _id: payload._id });
    if (!student) {
      res.status(401).send("Student not identified");
    }

    res.status(200).json(student);
  } catch (err) {
    console.log(err);
  }
};
module.exports = {
  getStudent: getStudent,
};
