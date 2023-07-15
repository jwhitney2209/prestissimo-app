const { gql } = require("apollo-server");

module.exports = gql`
  type Person {
    id: ID!
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
    uniforms: [Uniform]
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
    email: String!
    token: String!
    password: String!
    createdAt: String!
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
    # get all
    getUsers: [User]
    getPersons: [Person]
    getItems: [Item]
    getSections: [Section]
    getEnsembles: [Ensemble]
    getUniforms: [Uniform]
    # get one
    getUser(userId: ID!): User!
    getPerson(personId: ID!): Person!
    getItem(itemId: ID!): Item!
    getSection(sectionId: ID!): Section!
    getEnsemble(ensembleId: ID!): Ensemble!
    # get by
    getPersonsByEnsemble(ensembleId: ID!): [Person]
    getPersonsBySection(sectionId: ID!): [Person]
    getPersonsByUniform(uniformId: ID!): [Person]
  }

  type Mutation {
    # user mutations
    register(email: String!, password: String!, confirmPassword: String!): User!
    login(email: String!, password: String!): User!
    # create 
    createPerson(firstName: String!, lastName: String!, email: String!, phone: String!, grade: String!): Person!
    createSection(sectionInput: SectionInput): Section!
    createEnsemble(ensembleInput: EnsembleInput): Ensemble!
    createItem(itemInput: ItemInput): Item!
    createUniform(uniformInput: UniformInput): Uniform!
    # update
    updateSection(sectionId: ID!, sectionInput: SectionInput): Section!
    updatePerson(personId: ID!, firstName: String!, lastName: String!, email: String!, phone: String!, grade: String!): Person!
    updateItem(itemId: ID!, itemInput: ItemInput): Item!
    updateEnsemble(ensembleId: ID!, ensembleInput: EnsembleInput): Ensemble!
    assignEnsembleToPerson(personId: ID!, ensembleId: ID!): Person!
    assignSectionToPerson(personId: ID!, sectionId: ID!): Person!
    assignUniformToPerson(personId: ID!, uniformId: ID!): Person!
    # delete
    deletePerson(personId: ID!): ID!
    deleteItem(itemId: ID!): ID!
    deleteSection(sectionId: ID!): ID!
    deleteEnsemble(ensembleId: ID!): ID!
    deleteUniform(uniformId: ID!): ID!
  }
`;
