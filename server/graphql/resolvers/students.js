const Student = require("../../models/Student");
const { authMiddleware } = require("../../utils/check-auth");
const csvtojson = require("csvtojson");
const fs = require("fs");

module.exports = {
  Query: {
    async students(_, args, context) {
      const user = context.user;
      try {
        const students = await Student.find({ userId: user._id })
          .sort({
            createdAt: -1,
          })
          .populate("classes")
          .populate("uniforms");
        return students;
      } catch (err) {
        throw new Error(err);
      }
    },
    async student(_, { studentId }) {
      try {
        const student = await Student.findById(studentId)
          .populate("classes")
          .populate("uniforms");
        if (student) {
          console.log(student);
          return student;
        } else {
          throw new Error("Student not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async addStudent(_, { input }, context) {
      const user = context.user;

      if (!user) {
        throw new Error("You must be logged in to perform this action.");
      }

      // Destructure the input object to extract the properties
      const {
        firstName,
        lastName,
        email,
        phone,
        grade,
        instrument,
        classIds,
        uniformIds,
      } = input;

      const newStudent = new Student({
        userId: user._id, // Assuming context.user._id is the ID of the authenticated user
        firstName,
        lastName,
        email,
        phone,
        grade,
        instrument,
        classes: classIds, // This expects an array of class IDs
        uniforms: uniformIds, // This expects an array of uniform IDs
      });

      // Save the new student to the database
      const student = await newStudent.save();

      // Populate the student with related documents if needed
      // If you need the full objects of instrument, classes, or uniforms, you can populate them here
      // For example:
      // await student
      //   .populate("instrument")
      //   .populate("classes")
      //   .populate("uniforms");

      return student;
    },
    async deleteStudent(_, { studentId }, context) {
      try {
        const student = await Student.findByIdAndDelete(studentId);
        return `${student.firstName} ${student.lastName} was deleted successfully.`;
      } catch (err) {
        throw new Error(err);
      }
    },
    async updateStudent(_, { studentId, input }, context) {
      const user = context.user;

      if (!user) {
        throw new Error("You must be logged in to perform this action.");
      }

      // Destructure the input object to extract the properties
      const {
        firstName,
        lastName,
        email,
        phone,
        grade,
        instrument,
        classIds,
        uniformIds,
      } = input;

      try {
        const student = await Student.findOneAndUpdate(
          { _id: studentId },
          {
            $set: {
              firstName,
              lastName,
              email,
              phone,
              grade,
              instrument,
              classes: classIds, // This expects an array of class IDs
              uniforms: uniformIds, // This expects an array of uniform IDs
            },
          },
          { new: true }
        );
        return student;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
