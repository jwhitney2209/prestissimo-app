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
    accountBalance: Float
    userId: String
    section: Section
    ensembles: [Ensemble]
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
  }

  type Item {
    id: ID!
    name: String!
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
    section: Section
  }

  type Uniform {
    id: ID!
    name: String!
    size: String
    condition: String
    createdAt: String!
    userId: String!
  }

  input UniformInput {
    name: String!
    size: String
    condition: String
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
    description: String
    modelNumber: String
    serialCode: String
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
    getItems: [Item]
    getItem(itemId: ID!): Item!
    getSections: [Section]
    getSection(sectionId: ID!): Section!
    getEnsembles: [Ensemble]
    getEnsemble(ensembleId: ID!): Ensemble!
    getPersonsByEnsemble(ensembleId: ID!): [Person]
    getPersonsBySection(sectionId: ID!): [Person]
  }

  type Mutation {
    register(registerInput: RegisterInput): User!
    login(email: String!, password: String!): User!
    createPerson(personInput: PersonInput): Person!
    deletePerson(personId: ID!): ID!
    createItem(itemInput: ItemInput): Item!
    deleteItem(itemId: ID!): ID!
    createSection(sectionInput: SectionInput): Section!
    deleteSection(sectionId: ID!): ID!
    createEnsemble(ensembleInput: EnsembleInput): Ensemble!
    deleteEnsemble(ensembleId: ID!): ID!
    updateSection(sectionId: ID!, sectionInput: SectionInput): Section!
    updatePerson(personId: ID!, personInput: PersonInput): Person!
    updateItem(itemId: ID!, itemInput: ItemInput): Item!
    updateEnsemble(ensembleId: ID!, ensembleInput: EnsembleInput): Ensemble!
    updatePersonEnsemble(personId: ID!, ensembleId: ID!): Person!
    updatePersonSection(personId: ID!, sectionId: ID!): Person!
  }
`;
