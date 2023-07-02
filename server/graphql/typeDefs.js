const { gql } = require("apollo-server");

module.exports = gql`
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    phone: String!
    password: String!
    organization: String!
    street: String!
    city: String!
    state: String!
    zip: String!
    createdAt: String!
  }
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    token: String!
    phone: String!
    password: String!
    organization: String!
    street: String!
    city: String!
    state: String!
    zip: String!
    createdAt: String!
  }
  input RegisterInput {
    firstName: String!
    lastName: String!
    email: String!
    phone: String!
    password: String!
    confirmPassword: String!
    organization: String!
    street: String!
    city: String!
    state: String!
    zip: String!
  }
  type Query {
    getUsers: [User]
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(email: String!, password: String!): User!
  }
`;
