const Author = require("../database/models/authorSchema");

async function getAuthors(req, res) {
  try {
    const response = await Author.find();
    const authors = response.map((element) => {
      return element.authorname;
    });
    res.json(authors);
    console.log("authors", response);
  } catch (err) {
    console.log(err.message);
  }
}

module.exports = {
  getAuthors: getAuthors,
};
