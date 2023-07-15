const usersResolvers = require("./users");
const studentResolvers = require("./students");
const itemsResolvers = require("./items");
const sectionsResolvers = require("./sections");
const ensembleResolvers = require("./ensembles");
const uniformsResolvers = require("./uniforms");

module.exports = {
  Query: {
    ...usersResolvers.Query,
    ...studentResolvers.Query,
    ...itemsResolvers.Query,
    ...sectionsResolvers.Query,
    ...ensembleResolvers.Query,
    ...uniformsResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...studentResolvers.Mutation,
    ...itemsResolvers.Mutation,
    ...sectionsResolvers.Mutation,
    ...ensembleResolvers.Mutation,
    ...uniformsResolvers.Mutation,
  },
};
