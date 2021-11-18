const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

dotenv.config({ path: "./config.env" });

const app = express();
//////  MIDDLEWARES  ////////
app.use(cors());
app.use(express.json());
app.use(require("./controllers/paths"));
require("./database/connection");

app.listen(process.env.PORT, () => {
  console.log(`Listening successfully at port ${process.env.PORT}`);
});
