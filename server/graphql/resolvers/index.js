const usersResolvers = require("./users");
const personsResolvers = require("./persons");
const inventoryResolvers = require("./inventories");
const sectionsResolvers = require("./sections");
const ensembleResolvers = require("./ensembles");

module.exports = {
  Query: {
    ...usersResolvers.Query,
    ...personsResolvers.Query,
    ...inventoryResolvers.Query,
    ...sectionsResolvers.Query,
    ...ensembleResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...personsResolvers.Mutation,
    ...inventoryResolvers.Mutation,
    ...sectionsResolvers.Mutation,
    ...ensembleResolvers.Mutation,
  },
};
