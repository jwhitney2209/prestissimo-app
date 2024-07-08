const Student = require("../../models/Student");
const Financial = require("../../models/Financial");
const User = require("../../models/User");
const Program = require("../../models/Program");
const { authMiddleware } = require("../../utils/check-auth");

module.exports = {
  Query: {
    async studentsByProgram(_, { programId }) {
      try {
        const students = await Student.find({ program: programId }).populate(
          "financial"
        );
        return students;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async addStudent(
      _,
      {
        firstName,
        lastName,
        email,
        phoneNumber,
        programId,
        parentIds = [],
        financial,
      },
      context
    ) {
      const user = context.user;

      // if user is not logged in, they cannot add students
      if (!user) {
        throw new Error("You must be logged in to do this.");
      }

      // if user is not found, they cannot add students
      const dbUser = await User.findById(user._id);
      if (!dbUser) {
        throw new Error("User not found.");
      }

      // if user role is not staff or admin, they cannot add students
      if (dbUser.role !== "staff" && dbUser.role !== "admin") {
        throw new Error("You are not authorized to add students.");
      }

      try {
        let financialDoc = null;
        if (financial) {
          financialDoc = new Financial(financial);
          await financialDoc.save();
        } else {
          financialDoc = new Financial({ balance: 0, payments: [] });
          await financialDoc.save();
        }
        const newStudent = new Student({
          firstName,
          lastName,
          email,
          phoneNumber,
          program: programId,
          parents: parentIds,
          financial: financialDoc._id,
        });

        const student = await newStudent.save();

        await Program.findByIdAndUpdate(programId, { $push: { students: student._id } });
        
        return student;
      } catch (err) {
        throw new Error(err);
      }
    },
    async addPayment(_, { studentId, amount, date, description }, context) {
      const user = context.user;

      if (!user) {
        throw new Error("You must be logged in to perform this action.");
      }

      const dbUser = await User.findById(user._id);

      if (!dbUser) {
        throw new Error("User not found.");
      }

      if (dbUser.role !== "staff" && dbUser.role !== "admin") {
        throw new Error("You are not authorized to add payments.");
      }

      try {
        const student = await Student.findById(studentId).populate("financial");

        if (!student) {
          throw new Error("Student not found.");
        }

        const financial = student.financial;
        if (!financial) {
          throw new Error("Financial record not found for this student.");
        }

        const newPayment = { amount, description };
        financial.payments.push(newPayment);
        financial.balance += amount; // adjust the balance as needed

        await financial.save();
        return financial;
      } catch (err) {
        throw new Error(err);
      }
    }
  },
};
