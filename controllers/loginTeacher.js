const Teacher = require("../database/models/teacherSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function loginTeacher(req, res) {
  try {
    // Get teacher credentials
    const { teacher_id, password } = req.body;

    // Validate ID and password
    if (!teacher_id || !password) {
      return res
        .status(400)
        .json({ error: "Please fill the data", code: "err" });
    } else {
      // Find userID and check  password in database
      const myTeacher = await Teacher.findOne({ teacher_id: teacher_id });
      console.log(myTeacher);
      if (!myTeacher) {
        res.status(400).json({ error: "Invalid username", code: "err" });
      } else {
        const passwordMatch = await bcrypt.compare(
          password,
          myTeacher.password
        );
        if (!passwordMatch) {
          res.status(400).json({ error: "Invalid password", code: "err" });
        } else {
          // Create token if password matches
          const token = jwt.sign(
            { _id: myTeacher._id },
            process.env.SECRET_KEY_JWT,
            { expiresIn: "720h" }
          );

          // save token to teacher Object
          myTeacher.token = token;

          res.status(200).json(myTeacher);
        }
      }
    }
  } catch (err) {
    console.log(err.message);
  }
}

module.exports = {
  loginTeacher: loginTeacher,
};
