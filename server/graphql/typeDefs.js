const { gql } = require("apollo-server");

module.exports = gql`
  type Student{
    id: ID!
    firstName: String!
    lastName: String!
    createdAt: String!
    schoolId: String
    email: String
    phone: String
    age: String
    grade: String!
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

  input StudentInput {
    firstName: String!
    lastName: String!
    schoolId: String
    email: String
    phone: String
    age: String
    grade: String!
  }

  type Query {
    getUsers: [User]
    getUser(userId: ID!): User
    getStudents: [Student]
    getStudent(studentId: ID!): Student!
  }

  type Mutation {
    register(registerInput: RegisterInput): User!
    login(email: String!, password: String!): User!
    createStudent(studentInput: StudentInput): Student!
    deleteStudent(studentId: ID!): ID!
  }
`;
