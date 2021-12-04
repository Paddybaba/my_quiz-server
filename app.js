const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
dotenv.config({ path: "./config.env" });

// require("./controllers/uploadFile");
const app = express();
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
//////  MIDDLEWARES  ////////
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(require("./controllers/paths"));
require("./database/connection");

app.listen(process.env.PORT, () => {
  console.log(`Listening successfully at port ${process.env.PORT}`);
});
