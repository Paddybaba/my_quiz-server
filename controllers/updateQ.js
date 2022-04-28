const Question = require("../database/models/questionSchema");

async function updateQ(req, res) {
  const options = req.body;
  console.log(options);
  try {
    const result = await Question.updateMany(
      { author: "paddybaba@gmail.com" },
      { authorname: "Anup Padamwar" }
    );
    console.log(result);
    res.send("Success");
  } catch (err) {
    console.log(err.message);
  }
}
module.exports = {
  updateQ: updateQ,
};
