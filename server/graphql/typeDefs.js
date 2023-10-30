const { gql } = require("graphql-tag");

module.exports = gql`
  type User {
    
  }
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

  type Instrument {
    id: ID!
    name: String!
    createdAt: String!
    userId: String!
  }

  type Class {
    id: ID!
    name: String!
    createdAt: String!
    userId: String!
  }

  type Uniform {
    id: ID!
    category: String!
    name: String!
    size: String!
    quantity: Int!
    condition: String
    createdAt: String!
    assignedTo: Student
    userId: String!
  }


  type Query {
    # get all
    getUsers: [User]
    getStudents: [Student]
    getInstruments: [Instrument]
    getClasses: [Class]
    getUniforms: [Uniform]
    # get one
    getUser(userId: ID!): User!
    getStudent(studentId: ID!): Student!
    getInstrument(instrumentId: ID!): Instrument!
    getClass(classId: ID!): Class!
    getUniform(uniformId: ID!): Uniform!
  }

  type Mutation {
    # file upload
    convertCSV(url: String!): String
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
  }
`;
