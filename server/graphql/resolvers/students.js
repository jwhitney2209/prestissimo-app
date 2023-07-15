const Student = require("../../models/Student");
const Ensemble = require("../../models/Ensemble");
const Section = require("../../models/Section");
const Uniform = require("../../models/Uniform");
const checkAuth = require("../../utils/check-auth");

module.exports = {
  Query: {
    async getStudents(_, args, context) {
      const user = checkAuth(context);
      try {
        const students = await Student.find({ userId: user.id })
          .sort({
            createdAt: -1,
          })
          .populate("ensembles")
          .populate("section")
          .populate("uniforms");
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
    async getStudentsByEnsemble(_, { ensembleId }) {
      try {
        const ensemble = await Ensemble.findById(ensembleId);
        if (ensemble) {
          const students = await Student.find({ ensembles: ensemble }).populate(
            "section"
          );
          return students;
        } else {
          throw new Error("Ensemble not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    async getStudentsBySection(_, { sectionId }) {
      try {
        const section = await Section.findById(sectionId);
        if (section) {
          const students = await Student.find({ section: section }).populate(
            "ensembles"
          );
          return students;
        } else {
          throw new Error("Section not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    async getStudentsByUniform(_, { uniformId }) {
      try {
        const uniform = await Uniform.findById(uniformId);
        if (uniform) {
          const students = await Student.find({ uniforms: uniform });
          return students;
        } else {
          throw new Error("Uniform not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async addStudent(
      _,
      { firstName, lastName, email, phone, grade },
      context
    ) {
      const user = checkAuth(context);
      const newStudent = new Student({
        firstName,
        lastName,
        email,
        phone,
        grade,
        userId: user.id,
        createdAt: new Date().toISOString(),
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
      {
        studentId,
        firstName,
        lastName,
        email,
        phone,
        grade,
        accountBalance,
      },
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
              accountBalance: accountBalance,
            },
          },
          { new: true }
        );
        return student;
      } catch (err) {
        throw new Error(err);
      }
    },
    async assignEnsembleToStudent(_, { studentId, ensembleId }, context) {
      const ensemble = await Ensemble.findById(ensembleId);
      try {
        const student = await Student.findOneAndUpdate(
          { _id: studentId },
          {
            $push: {
              ensembles: ensemble,
            },
          },
          { new: true }
        ).populate("ensembles");
        return student;
      } catch (err) {
        throw new Error(err);
      }
    },
    async assignSectionToStudent(_, { studentId, sectionId }, context) {
      const section = await Section.findById(sectionId);
      try {
        const student = await Student.findOneAndUpdate(
          { _id: studentId },
          {
            $set: {
              section: section,
            },
          },
          { new: true }
        ).populate("section");
        return student;
      } catch (err) {
        throw new Error(err);
      }
    },
    async assignUniformToStudent(_, { studentId, uniformId }, context) {
      const uniform = await Uniform.findById(uniformId);
      try {
        const student = await Student.findOneAndUpdate(
          { _id: studentId },
          {
            $push: {
              uniforms: uniform,
            },
          },
          { new: true }
        ).populate("uniforms");
        return student;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
