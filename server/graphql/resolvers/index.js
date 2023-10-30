const usersResolvers = require("./users");
const studentResolvers = require("./students");
const instrumentResolvers = require("./instruments");
const classResolvers = require("./classes");
const uniformResolvers = require("./uniforms");
const uploadsResolvers = require("./uploads");

module.exports = {
  Query: {
    ...usersResolvers.Query,
    ...studentResolvers.Query,
    ...instrumentResolvers.Query,
    ...classResolvers.Query,
    ...uniformResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...studentResolvers.Mutation,
    ...instrumentResolvers.Mutation,
    ...classResolvers.Mutation,
    ...uniformResolvers.Mutation,
    ...uploadsResolvers.Mutation,
  }
};
