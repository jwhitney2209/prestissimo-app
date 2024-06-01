const Program = require("../../models/Program");

module.exports = {
  Query: {
    async program(_, { id }) {
      try {
        const program = await Program.findById(id)
          .populate("users")
          .populate("students")
          .populate("parents");
        if (program) {
          return program;
        } else {
          throw new Error("Program not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Program: {
    async users(program) {
      return program.users
    },
    async students(program) {
      return program.students
    },
    async parents(program) {
      return program.parents
    },
  }
};
