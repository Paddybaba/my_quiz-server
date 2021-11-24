const Student = require("../database/models/studentSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function loginHandler(req, res) {
  const { student_id, password } = req.body;
  try {
    if (!student_id || !password) {
      return res
        .status(400)
        .json({ error: "Please fill the data", code: "err" });
    } else {
      const userData = await Student.findOne({ student_id: student_id });
      if (!userData) {
        res.status(400).json({ error: "Invalid username", code: "err" });
      } else {
        const passwordMatch = await bcrypt.compare(password, userData.password);
        const token = await userData.generateToken();
        console.log(token);

        if (!passwordMatch) {
          res.status(400).json({ error: "Invalid password", code: "err" });
        } else {
          res.cookie("access-token", token, {
            maxAge: 60 * 60 * 24 * 1000,
          });
          res.json({
            message: `${userData.student_name} signin successfully`,
            student: {
              student_name: userData.student_name,
              student_id: userData.student_id,
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
  loginHandler: loginHandler,
};
