const Teacher = require("../database/models/teacherSchema");
const pendingTeacher = require("../database/models/pendingTeacher");
const Author = require("../database/models/authorSchema");
const bcryt = require("bcryptjs");
var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "paddybaba@gmail.com",
    pass: process.env.GMAIL_PASS,
  },
});

async function registerTeacher(req, res) {
  try {
    const { teacher_name, teacher_id, password, city, school } = req.body;

    const teacherExists = await Teacher.findOne({ teacher_id: teacher_id });

    if (!teacherExists) {
      const hash = await bcryt.hash(password, 10);

      const writeresult = await pendingTeacher.create({
        teacher_id: teacher_id,
        teacher_name: teacher_name,
        password: hash,
        city: city,
        school: school,
      });
      console.log("teacher Added successfully :", writeresult._id.toString());
      if (writeresult) {
        var mailOptions = {
          from: "paddybaba@gmail.com",
          to: teacher_id,
          subject: "Sending Email using Node.js",
          text: `click on the activation link : http://localhost:8080/api/activate/${writeresult._id.toString()}`,
        };
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + info.response);
          }
        });
        // emailJS.send(
        //   "service_5qlcc0g",
        //   "template_vhwwprs",
        //   {
        //     teacher_id: teacher_id,
        //     teacher_name: teacher_name,
        //     city: city,
        //     school: school,
        //     pendingID: writeresult._id.toString(),
        //   },
        //   process.env.EMAILJS_ID
        // );
        res.json("Thanks for registering, check your mail for activation link");
      }
    } else {
      res.status(400).send("This id is already registered");
    }
  } catch (err) {
    console.log(err.message);
    res.status(400).send("Some error occured");
  }
}

module.exports = {
  registerTeacher: registerTeacher,
};
