const { AuthenticationError } = require("apollo-server");

const Student = require("../../models/Student");
const checkAuth = require("../../utils/check-auth");

module.exports = {
  Query: {
    async getStudents() {
      try {
        const students = await Student.find().sort({ createdAt: -1 });
        return students;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getStudent(_, { studentId }) {
      try {
        const student = await Student.findById(studentId);
        if (student) {
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
    async createStudent(
      _,
      {
        studentInput: {
          firstName,
          lastName,
          schoolId,
          email,
          phone,
          age,
          grade,
        },
      },
      context
    ) {
      const user = checkAuth(context);
      const newStudent = new Student({
        firstName,
        lastName,
        schoolId,
        email,
        phone,
        age,
        grade,
        userId: user.id,
        createdAt: new Date().toISOString(),
      });

      const student = await newStudent.save();

      return student;
    },
    async deleteStudent(_, { studentId }, context) {
      const user = checkAuth(context);

      try {
        const student = await Student.findById(studentId);
        const studentUserId = student.userId.toHexString();
        if (user.id === studentUserId) {
          await student.deleteOne();
          return 'Student deleted successfully';
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } catch (err) {
        throw new Error(err);
      }

    },
  },
};
