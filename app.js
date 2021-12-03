const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
dotenv.config({ path: "./config.env" });
const multer = require("multer");
// require("./controllers/uploadFile");
const app = express();
//////  MIDDLEWARES  ////////
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(require("./controllers/paths"));
require("./database/connection");

app.listen(process.env.PORT, () => {
  console.log(`Listening successfully at port ${process.env.PORT}`);
});
