const mongoose = require("mongoose");

const db = process.env.DATABASE;

mongoose
  .connect(db)
  .then(() => {
    console.log("Connected successfully to the database");
  })
  .catch((err) => {
    console.log("Error connecting to the database");
  });
