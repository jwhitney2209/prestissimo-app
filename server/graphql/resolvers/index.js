const usersResolvers = require("./users");
const studentResolvers = require("./students");
const classResolvers = require("./classes");
const uniformResolvers = require("./uniforms");
const uploadsResolvers = require("./uploads");
const eventsResolvers = require("./events");

module.exports = {
  Query: {
    ...usersResolvers.Query,
    ...studentResolvers.Query,
    ...classResolvers.Query,
    ...uniformResolvers.Query,
    ...eventsResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...studentResolvers.Mutation,
    ...classResolvers.Mutation,
    ...uniformResolvers.Mutation,
    ...uploadsResolvers.Mutation,
    ...eventsResolvers.Mutation,
  }
};
