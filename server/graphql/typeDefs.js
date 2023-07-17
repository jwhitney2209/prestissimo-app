const { gql } = require("graphql-tag");

module.exports = gql`
  type Student {
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
    description: String
    quantity: Int!
    createdAt: String!
    userId: String
  }

  type User {
    _id: ID
    email: String
    token: String
    password: String
    createdAt: String
  }

  type Uniform {
    id: ID!
    name: String!
    size: String!
    condition: String
    createdAt: String!
    userId: String!
  }

  type Query {
    # get all
    getUsers: [User]
    getStudents: [Student]
    getItems: [Item]
    getSections: [Section]
    getEnsembles: [Ensemble]
    getUniforms: [Uniform]
    # get one
    getUser(userId: ID!): User!
    getStudent(studentId: ID!): Student!
    getItem(itemId: ID!): Item!
    getSection(sectionId: ID!): Section!
    getEnsemble(ensembleId: ID!): Ensemble!
    # get by
    getStudentsByEnsemble(ensembleId: ID!): [Student]
    getStudentsBySection(sectionId: ID!): [Student]
    getStudentsByUniform(uniformId: ID!): [Student]
  }

  type Mutation {
    # user mutations
    register(email: String!, password: String!, confirmPassword: String!): User
    login(email: String!, password: String!): User
    # create
    addStudent(
      firstName: String!
      lastName: String!
      email: String!
      phone: String!
      grade: String!
    ): Student!
    addSection(name: String!): Section!
    addEnsemble(name: String!): Ensemble!
    addItem(name: String!, description: String, quantity: Int!): Item!
    addUniform(name: String!, size: String!, condition: String): Uniform!
    # update
    updateSection(sectionId: ID!, name: String!): Section!
    updateStudent(
      studentId: ID!
      firstName: String!
      lastName: String!
      email: String!
      phone: String!
      grade: String!
    ): Student!
    updateItem(
      itemId: ID!
      name: String!
      description: String
      quantity: Int!
    ): Item!
    updateEnsemble(ensembleId: ID!, name: String!): Ensemble!
    assignEnsembleToStudent(studentId: ID!, ensembleId: ID!): Student!
    assignSectionToStudent(studentId: ID!, sectionId: ID!): Student!
    assignUniformToStudent(studentId: ID!, uniformId: ID!): Student!
    # delete
    deleteStudent(studentId: ID!): ID!
    deleteItem(itemId: ID!): ID!
    deleteSection(sectionId: ID!): ID!
    deleteEnsemble(ensembleId: ID!): ID!
    deleteUniform(uniformId: ID!): ID!
  }
`;
