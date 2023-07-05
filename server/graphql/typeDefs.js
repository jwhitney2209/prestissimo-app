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

  type Section {
    id: ID!
    name: String!
    createdAt: String!
    userId: String!
  }

  type Ensemble {
    id: ID!
    name: String!
    createdAt: String!
    userId: String!
    userOrganization: String!
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

  input EnsembleInput {
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
    getEnsembles: [Ensemble]
    getEnsemble(ensembleId: ID!): Ensemble!
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
    createEnsemble(ensembleInput: EnsembleInput): Ensemble!
    deleteEnsemble(ensembleId: ID!): ID!
    updateSection(sectionId: ID!, sectionInput: SectionInput): Boolean
    updatePerson(personId: ID!, personInput: PersonInput): Boolean
    updateItem(itemId: ID!, itemInput: ItemInput): Boolean
    updateEnsemble(ensembleId: ID!, ensembleInput: EnsembleInput): Boolean
  }
`;
