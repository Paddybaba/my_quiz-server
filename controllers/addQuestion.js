const Question = require("../database/models/questionSchema");
const Author = require("../database/models/authorSchema");
const multer = require("multer");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");

///////////////////
// 1. receive formdata from frontend
// 2. create question object with empty images
// 3. upload imahges to s3
// 4. receive and add the locations to question object
// 5. upload question to database
//////////////////////
// const s3 = new aws.S3({
//   accessKeyId: process.env.ACCESS_KEY,
//   secretAccessKey: process.env.SECRET_ACCESS_KEY,
// });

// const uploadToS3 = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: "paddy-photo-bucket",
//     acl: "public-read",
//     metadata: function (req, file, cb) {
//       cb(null, { fieldName: file.fieldname });
//     },
//     key: function (req, file, cb) {
//       cb(null, `${Date.now().toString()}-${file.originalname}`);
//     },
//   }),
// });

async function addQuestion(req, res) {
  const question = req.body;
  console.log("files :", req.files);
  try {
    const writeresult = await Question.create(question);

    if (writeresult) {
      const authorExists = await Author.findOne({
        authorname: question.author,
      });
      if (!authorExists) {
        await Author.create({ authorname: question.author });
      } else {
        console.log("author is already present in database");
      }

      res.status(200).json("Question added successfully");
    } else {
      console.log("Question not added");
    }
  } catch (err) {
    console.log(err.message);
  }
}

module.exports = {
  addQuestion: addQuestion,
};
