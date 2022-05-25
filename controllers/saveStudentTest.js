const jwt = require("jsonwebtoken");
const Student = require("../database/models/studentSchema");
const bcryt = require("bcryptjs");

async function saveStudentTest(req, res) {
  try {
    // Get student's test details from frontend
    const test2save = req.body;
    // console.log(test2save);
    res.send("OK");
    // find and update in the database using student_id
    const writeresult = await Student.findOneAndUpdate(
      { student_id: test2save.student_id },
      { savedTest: test2save },
      { new: true }
    );
    console.log("saved this test", writeresult);
  } catch (err) {
    console.log(err.message);
  }
}

module.exports = {
  saveStudentTest: saveStudentTest,
};
