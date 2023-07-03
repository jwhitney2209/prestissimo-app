const usersResolvers = require("./users");
const studentsResolvers = require("./students");

module.exports = {
  Query: {
    ...usersResolvers.Query,
    ...studentsResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...studentsResolvers.Mutation,
  }
}