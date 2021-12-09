const Teacher = require("../database/models/teacherSchema");
const Author = require("../database/models/authorSchema");
const pendingTeacher = require("../database/models/pendingTeacher");

async function activateTeacher(req, res) {
  const {pending_user} = req.query;
  try {
    console.log(req.query);
        const newTeacher = await pendingTeacher.findOne({ _id:pending_user });
        if (newTeacher) {
          const { teacher_id, teacher_name, password, city, school } = newTeacher;
          const writeresult = await Teacher.create({
            teacher_id: teacher_id,
            teacher_name: teacher_name,
            password: password,
            city: city,
            school: school,
          });
          const authorExists = await Author.findOne({ authorname: teacher_name });
          if (!authorExists) Author.create({ authorname: teacher_name });
          await pendingTeacher.deleteOne({ teacher_id: teacher_id });
          //   console.log("teacher Added successfully :", writeresult._id.toString());
          res.json("Activated Successfully, please proceed for login");
        } else {
          res.status(400).send("Invalid link");
        }
  } catch (err) {
    console.log(err.message);
  }
}

module.exports = {
  activateTeacher: activateTeacher,
};
