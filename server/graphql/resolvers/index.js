const usersResolvers = require("./users");
const personsResolvers = require("./persons");
const itemsResolvers = require("./items");
const sectionsResolvers = require("./sections");
const ensembleResolvers = require("./ensembles");

module.exports = {
  Query: {
    ...usersResolvers.Query,
    ...personsResolvers.Query,
    ...itemsResolvers.Query,
    ...sectionsResolvers.Query,
    ...ensembleResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...personsResolvers.Mutation,
    ...itemsResolvers.Mutation,
    ...sectionsResolvers.Mutation,
    ...ensembleResolvers.Mutation,
  },
};
