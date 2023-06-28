const User = require("../models/User");
const Student = require("../models/Student");
const Parent = require("../models/Parent");
const Volunteer = require("../models/Volunteer");
const Staff = require("../models/Staff");
const Ensemble = require("../models/Ensemble");
const Section = require("../models/Section");

const graphql = require("graphql");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLEnumType,
  GraphQLInt,
} = graphql;

// user type
const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
    password: { type: GraphQLString },
    organization: { type: GraphQLString },
    street: { type: GraphQLString },
    city: { type: GraphQLString },
    state: { type: GraphQLString },
    zip: { type: GraphQLInt },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return User.find();
      },
    },
  },
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    // add a user
    addUser: {
      type: UserType,
      args: {
        firstName: { type: GraphQLNonNull(GraphQLString) },
        lastName: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
        organization: { type: GraphQLNonNull(GraphQLString) },
        street: { type: GraphQLNonNull(GraphQLString) },
        city: { type: GraphQLNonNull(GraphQLString) },
        state: {
          type: new GraphQLEnumType({
            name: "State",
            values: {
              AL: { value: "AL" },
              AK: { value: "AK" },
              AZ: { value: "AZ" },
              AR: { value: "AR" },
              CA: { value: "CA" },
              CO: { value: "CO" },
              CT: { value: "CT" },
              DE: { value: "DE" },
              FL: { value: "FL" },
              GA: { value: "GA" },
              HI: { value: "HI" },
              ID: { value: "ID" },
              IL: { value: "IL" },
              IN: { value: "IN" },
              IA: { value: "IA" },
              KS: { value: "KS" },
              KY: { value: "KY" },
              LA: { value: "LA" },
              ME: { value: "ME" },
              MD: { value: "MD" },
              MA: { value: "MA" },
              MI: { value: "MI" },
              MN: { value: "MN" },
              MS: { value: "MS" },
              MO: { value: "MO" },
              MT: { value: "MT" },
              NE: { value: "NE" },
              NV: { value: "NV" },
              NH: { value: "NH" },
              NJ: { value: "NJ" },
              NM: { value: "NM" },
              NY: { value: "NY" },
              NC: { value: "NC" },
              ND: { value: "ND" },
              OH: { value: "OH" },
              OK: { value: "OK" },
              OR: { value: "OR" },
              PA: { value: "PA" },
              RI: { value: "RI" },
              SC: { value: "SC" },
              SD: { value: "SD" },
              TN: { value: "TN" },
              TX: { value: "TX" },
              UT: { value: "UT" },
              VT: { value: "VT" },
              VA: { value: "VA" },
              WA: { value: "WA" },
              WV: { value: "WV" },
              WI: { value: "WI" },
              WY: { value: "WY" },
              DC: { value: "DC" },
            },
          }),
          defaultValue: "TX",
        },
        zip: { type: GraphQLNonNull(GraphQLInt) },
      },
      resolve(parent, args) {
        const user = new User({
          firstName: args.firstName,
          lastName: args.lastName,
          email: args.email,
          phone: args.phone,
          password: args.password,
          organization: args.organization,
          street: args.street,
          city: args.city,
          state: args.state,
          zip: args.zip,
        });
        return user.save();
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
