// const csvtojson = require("csvtojson");
const csv = require("csv-parser");
const Student = require("../../models/Student");
const Program = require("../../models/Program");

const fs = require("fs");

// const multer = require("multer");
// const AWS = require("aws-sdk");
// require("dotenv").config();

const processCSV = (filePath, programId) => {
  return new Promise((resolve, reject) => {
      const students = [];
      fs.createReadStream(filePath)
          .pipe(csv())
          .on('data', (row) => {
              const cleanedRow = {};
              Object.keys(row).forEach(key => {
                  cleanedRow[key.trim()] = row[key].trim();
              });
              
              const { firstName, lastName, email, phoneNumber } = cleanedRow;
              
              if (!firstName || !lastName || !email || !phoneNumber) {
                  console.error('Missing required field in row:', cleanedRow);
              } else {
                  const student = new Student({ firstName, lastName, email, phoneNumber, program: programId });
                  students.push(student);
              }
          })
          .on('end', async () => {
              try {
                  for (const student of students) {
                      await student.save();
                      const program = await Program.findById(programId);
                      program.students.push(student);
                      await program.save();
                  }
                  fs.unlink(filePath, (err) => {
                      if (err) {
                          console.error('Error deleting file:', err);
                          reject(err);
                      } else {
                          resolve();
                      }
                  });
              } catch (err) {
                  reject(err);
              }
          })
          .on('error', (err) => {
              fs.unlink(filePath, (unlinkErr) => {
                  if (unlinkErr) {
                      console.error('Error deleting file:', unlinkErr);
                  }
                  reject(err);
              });
          });
  });
};
module.exports = { processCSV };

// Configure AWS SDK
// AWS.config.update({
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   region: process.env.AWS_S3_REGION,
// });

// const s3 = new AWS.S3();

// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// module.exports = {
//   Mutation: {
//     async convertCSV(_, { url }, context) {
//       const user = context.user;
//       // get csv from s3
//       const params = {
//         Bucket: process.env.AWS_S3_BUCKET_NAME,
//         Key: url,
//       }
//       const file = await s3.getObject(params).promise();
//       // convert csv to json
//       const json = await csvtojson().fromString(file.Body.toString());
//       // console log json
//       // save json to db students and add userId to each student
//       try {
//         const students = await Student.insertMany(json.map(student => {
//           return { ...student, userId: user._id }
//         }));

//         await s3.deleteObject(params).promise();

//         return "Your students have successfully been imported!";
//       } catch (err) {
//         throw new Error(err);
//       }
//     },
//   },
// };
