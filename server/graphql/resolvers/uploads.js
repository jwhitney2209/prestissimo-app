const csvtojson = require("csvtojson");
const Student = require("../../models/Student");
const multer = require("multer");
const AWS = require("aws-sdk");
require("dotenv").config();

// Configure AWS SDK
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_S3_REGION,
});

const s3 = new AWS.S3();

const storage = multer.memoryStorage();
const upload = multer({ storage });

module.exports = {
  Mutation: {
    async convertCSV(_, { url }, context) {
      const user = context.user;
      // get csv from s3
      const params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: url,
      }
      const file = await s3.getObject(params).promise();
      // convert csv to json
      const json = await csvtojson().fromString(file.Body.toString());
      // console log json
      // save json to db students and add userId to each student
      try {
        const students = await Student.insertMany(json.map(student => {
          return { ...student, userId: user._id }
        }));

        await s3.deleteObject(params).promise();

        return "Your students have successfully been imported!";
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
