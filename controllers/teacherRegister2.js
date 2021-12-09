const Teacher = require("../database/models/teacherSchema");
const pendingTeacher = require("../database/models/pendingTeacher");
const bcryt = require("bcryptjs");
var nodemailer = require("nodemailer");
const { google } = require("googleapis");

const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
  "42687148759-fsdq52ucbakq7da124q7kjcqnscp4at1.apps.googleusercontent.com",
  "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",
  "https://developers.google.com/oauthplayground"
);
oauth2Client.setCredentials({
  refresh_token: process.env.MAIL_REFRESH_TOKEN,
});
const accessToken = oauth2Client.getAccessToken();

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    // user: "paddybaba@gmail.com",
    // pass: process.env.GMAIL_PASS,
    type: "OAuth2",
    user: "paddybaba@gmail.com",
    clientId: process.env.MAIL_CLIENT_ID,
    clientSecret: process.env.MAIL_SECRET_KEY,
    refreshToken: process.env.MAIL_REFRESH_TOKEN,
    accessToken: accessToken,
  },
  tls: {
    rejectUnauthorized: false,
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
          subject: "Activation Link for Teacher Registration",
          text: `click on the activation link : https://quiz-server-paddy.herokuapp.com/api/activate/?pending_user=${writeresult._id.toString()}`,
        };
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + info.response);
            res.json(
              "Thanks for registering, check your mail for activation link"
            );
          }
        });
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
