const jwt = require("jsonwebtoken");
const Student = require("../database/models/studentSchema");
const bcryt = require("bcryptjs");

async function registerStudent(req, res) {
  try {
    // Get user input
    const { student_name, student_id, password } = req.body;

    // Validate user input
    if (!(student_name && student_id && password)) {
      res.status(400).send("Data insufficient");
    }

    // Check user already registered
    const studentExists = await Student.findOne({ student_id: student_id });
    if (!studentExists) {
      // Encrypt password
      const hash = await bcryt.hash(password, 10);

      // Create user in database
      const student = await Student.create({
        student_id: student_id,
        student_name: student_name,
        password: hash,
      });
      console.log("Student Added successfully :", student._id.toString());

      // Create token
      const token = jwt.sign({ _id: student._id }, process.env.SECRET_KEY_JWT, {
        expiresIn: "720h",
      });

      // save student token
      student.token = token;

      // return student to frontend
      res.status(201).json(student);
    } else {
      res.status(201).send("This id is already registered, proceed to login");
    }
  } catch (err) {
    console.log(err.message);
  }
}

module.exports = {
  registerStudent: registerStudent,
};
