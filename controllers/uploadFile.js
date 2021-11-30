const AWS = require("aws-sdk");
const fs = require("fs");
const path = require("path");

AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
});

var s3 = new AWS.S3();
var filepath = "./controllers/file.txt";

var params = {
  Bucket: "paddy-photo-bucket",
  Body: fs.createReadStream(filepath),
  Key: "lets-save-this",
};

s3.upload(params, function (err, data) {
  //handle error
  if (err) {
    console.log("Error", err);
  }

  //success
  if (data) {
    console.log("Uploaded in:", data);
  }
});
