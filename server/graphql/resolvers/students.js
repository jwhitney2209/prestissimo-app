const Student = require("../../models/Student");
const { authMiddleware } = require("../../utils/check-auth");
const csvtojson = require("csvtojson");
const fs = require("fs");

module.exports = {
  Query: {
    async getStudents(_, args, context) {
      const user = context.user;
      try {
        const students = await Student.find({ userId: user._id })
          .sort({
            createdAt: -1,
          })
          .populate("classes")
          .populate("instrument")
          .populate("uniforms");
        return students;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getStudent(_, { studentId }) {
      try {
        const student = await Student.findById(studentId)
          .populate("classes")
          .populate("instrument")
          .populate("uniforms");
        if (student) {
          console.log(student)
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
    async addStudent(_, { firstName, lastName, email, phone, grade }, context) {
      const user = context.user;
      const newStudent = new Student({
        firstName,
        lastName,
        email,
        phone,
        grade,
        userId: user._id,
        createdAt,
      });

      const student = await newStudent.save();

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
    async updateStudent(
      _,
      { studentId, firstName, lastName, email, phone, grade },
      context
    ) {
      try {
        const student = await Student.findOneAndUpdate(
          { _id: studentId },
          {
            $set: {
              firstName: firstName,
              lastName: lastName,
              email: email,
              phone: phone,
              grade: grade,
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
