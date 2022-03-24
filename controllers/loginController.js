const Student = require("../database/models/studentSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function loginHandler(req, res) {
  try {
    //Get student input
    const { student_id, password } = req.body;
    console.log(student_id);

    // Validate user input
    if (!student_id || !password) {
      return res
        .status(400)
        .json({ error: "Please fill the data", code: "err" });
    } else {
      // Check if user exists in our database
      const student = await Student.findOne({ student_id: student_id });
      console.log("student", student);
      if (!student) {
        res.status(400).json({ error: "Invalid username", code: "err" });
      } else {
        // Compare credentials
        const passwordMatch = await bcrypt.compare(password, student.password);
        if (!passwordMatch) {
          res.status(400).json({ error: "Invalid password", code: "err" });
        } else {
          // Create token if password matches
          const token = jwt.sign(
            { _id: student._id },
            process.env.SECRET_KEY_JWT,
            { expiresIn: "720h" }
          );

          // save user token
          student.token = token;
          console.log(token);
          res.status(201).json(student);
        }
      }
    }
  } catch (err) {
    console.log(err.message);
  }
}

module.exports = {
  loginHandler: loginHandler,
};
