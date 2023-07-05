const usersResolvers = require("./users");
const personsResolvers = require("./persons");
const inventoryResolvers = require("./inventories");
const sectionsResolvers = require("./sections");

module.exports = {
  Query: {
    ...usersResolvers.Query,
    ...personsResolvers.Query,
    ...inventoryResolvers.Query,
    ...sectionsResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...personsResolvers.Mutation,
    ...inventoryResolvers.Mutation,
    ...sectionsResolvers.Mutation,
  },
};
