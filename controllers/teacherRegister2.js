const jwt = require("jsonwebtoken");
const pendingTeacher = require("../database/models/pendingTeacherSchema");
// const Author = require("../database/models/authorSchema");
const bcryt = require("bcryptjs");
/////////////////////////////////////////
//  Get teacher data from frontend
//  check it teacher is already present --- respond 
//  if not present -- save teacher in pending List
//  send email to teacher with activation link
//////////////////////////////////////////
async function registerTeacher(req, res) {
  try {
    const { teacher_name, teacher_id, password, city,school } = req.body;

    const teacherExists = await Teacher.findOne({ teacher_id: teacher_id });
    if (!teacherExists) {
      const hash = await bcryt.hash(password, 10);
      const writeresult = await Teacher.create({
        teacher_id: teacher_id,
        teacher_name: teacher_name,
        password: hash,
        city:city,
        school:school
      });
      const authorExists = await Author.findOne({ authorname: teacher_name });
      if (!authorExists) Author.create({ authorname: teacher_name });
      //   console.log("teacher Added successfully :", writeresult._id.toString());
      res.json("Registered Successfully");
    } else {
      res.status(400).send("This id is already registered");
    }
  } catch (err) {
    console.log(err.message);
  }
}

module.exports = {
  registerTeacher: registerTeacher,
};
