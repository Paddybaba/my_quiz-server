const Question = require("../database/models/questionSchema");
const Author = require("../database/models/authorSchema");

///////////////////
// 1. receive formdata from frontend
// 2. create question object with empty images
// 3. upload images to s3 (See in paths.js as a middleware)
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

async function editQuestion(req, res) {
  const question = JSON.parse(req.body.question);
  console.log("qestions", question);
  console.log("files :", req.files);

  //   res.send("data received");
  try {
    const imageFiles = req.files;
    var questionFile = imageFiles.filter((obj) => {
      return obj.originalname == "questionImage";
    });
    var optionAFile = imageFiles.filter((obj) => {
      return obj.originalname == "optionA";
    });
    var optionBFile = imageFiles.filter((obj) => {
      return obj.originalname == "optionB";
    });
    var optionCFile = imageFiles.filter((obj) => {
      return obj.originalname == "optionC";
    });
    var optionDFile = imageFiles.filter((obj) => {
      return obj.originalname == "optionD";
    });

    if (questionFile[0])
      question.question.quest.image = questionFile[0].location;
    if (optionAFile[0])
      question.question.options[0].image = optionAFile[0].location;
    if (optionBFile[0])
      question.question.options[1].image = optionBFile[0].location;
    if (optionCFile[0])
      question.question.options[2].image = optionCFile[0].location;
    if (optionDFile[0])
      question.question.options[3].image = optionDFile[0].location;
    const writeresult = await Question.findOneAndUpdate(
      { _id: question._id },
      question,
      { new: true }
    );
    console.log("edited Question :", writeresult);
    res.status(200).json("Question updated successfully");
  } catch (err) {
    console.log(err.message);
  }
}

module.exports = {
  editQuestion: editQuestion,
};
