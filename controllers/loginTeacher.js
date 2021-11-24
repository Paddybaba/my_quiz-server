const Teacher = require("../database/models/teacherSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function loginTeacher(req, res) {
  const { teacher_id, password } = req.body;
  try {
    if (!teacher_id || !password) {
      return res
        .status(400)
        .json({ error: "Please fill the data", code: "err" });
    } else {
      const userData = await Teacher.findOne({ teacher_id: teacher_id });
      if (!userData) {
        res.status(400).json({ error: "Invalid username", code: "err" });
      } else {
        const passwordMatch = await bcrypt.compare(password, userData.password);
        if (!passwordMatch) {
          res.status(400).json({ error: "Invalid password", code: "err" });
        } else {
          res.json({
            message: `${userData.teacher_name} signin successfully`,
            teacher: {
              teacher_name: userData.teacher_name,
              teacher_id: userData.teacher_id,
            },
          });
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
