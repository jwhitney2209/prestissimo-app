const { gql } = require("apollo-server");

module.exports = gql`
  type Person {
    id: ID!
    role: String!
    firstName: String!
    lastName: String!
    createdAt: String!
    email: String
    phone: String
    grade: String
    userId: String
  }

  type Inventory {
    id: ID!
    name: String!
    size: String
    quantity: Int!
    createdAt: String!
    userId: String
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

  type Section {
    id: ID!
    name: String!
    createdAt: String!
    userId: String!
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

  input PersonInput {
    role: String!
    firstName: String!
    lastName: String!
    email: String
    phone: String
    grade: String
  }

  input ItemInput {
    name: String!
    size: String
    quantity: Int!
  }

  input SectionInput {
    name: String!
  }

  type Query {
    getUsers: [User]
    getUser(userId: ID!): User!
    getPersons: [Person]
    getPerson(personId: ID!): Person!
    getItems: [Inventory]
    getItem(itemId: ID!): Inventory!
    getSections: [Section]
    getSection(sectionId: ID!): Section!
  }

  type Mutation {
    register(registerInput: RegisterInput): User!
    login(email: String!, password: String!): User!
    createPerson(personInput: PersonInput): Person!
    deletePerson(personId: ID!): ID!
    createItem(itemInput: ItemInput): Inventory!
    deleteItem(itemId: ID!): ID!
    createSection(sectionInput: SectionInput): Section!
    deleteSection(sectionId: ID!): ID!
  }
`;
