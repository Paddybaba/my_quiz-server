const jwt = require("jsonwebtoken");
const Teacher = require("../database/models/teacherSchema");
const Author = require("../database/models/authorSchema");
const bcryt = require("bcryptjs");

async function registerTeacher(req, res) {
  try {
    const { teacher_name, teacher_id, password } = req.body;

    const teacherExists = await Teacher.findOne({ teacher_id: teacher_id });
    if (!teacherExists) {
      const hash = await bcryt.hash(password, 10);
      const writeresult = await Teacher.create({
        teacher_id: teacher_id,
        teacher_name: teacher_name,
        password: hash,
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
