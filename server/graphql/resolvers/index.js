const usersResolvers = require("./users");
const personsResolvers = require("./persons");
const inventoryResolvers = require("./inventories");

module.exports = {
  Query: {
    ...usersResolvers.Query,
    ...personsResolvers.Query,
    ...inventoryResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...personsResolvers.Mutation,
    ...inventoryResolvers.Mutation,
  }
}