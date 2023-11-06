module.exports = `#graphql
  type Address {
    street: String!
    city: String!
    state: String!
    zip: String!
  }

  type School {
    schoolName: String!
    schoolAddress: Address!
  }

  type User {
    id: ID!
    email: String!
    firstName: String!
    lastName: String!
    school: School
    address: Address
    createdAt: String
  }

  type Student {
    id: ID!
    userId: String
    firstName: String!
    lastName: String!
    email: String
    phone: String
    grade: String
    createdAt: String!
    instrument: String
    classes: [Class!]
    uniforms: [Uniform!]
  }

  type Class {
    id: ID!
    userId: String
    name: String!
    createdAt: String!
  }

  type Uniform {
    id: ID!
    userId: String
    category: String!
    name: String!
    size: String
    condition: UniformCondition!
    quantity: Int!
    createdAt: String!
    assignedTo: Student
  }

  enum UniformCondition {
    NEW
    USED
    WORN
    DAMAGED
  }

  type Query {
    users: [User!]!
    user(userId: ID!): User!
    getStudents: [Student!]!
    getStudent(studentId: ID!): Student
    uniforms: [Uniform!]!
    uniform(uniformId: ID!): Uniform
    getClass(classId: ID!): Class
    classes: [Class!]!
  }

  type Mutation {
    # file upload
    convertCSV(url: String!): String
    # user mutations
    createUser(
      email: String!
      password: String!
      confirmPassword: String!
      firstName: String!
      lastName: String!
      school: SchoolInput
      address: AddressInput
    ): AuthPayload
    loginUser(email: String!, password: String!): AuthPayload
    verifyUser(token: String!): AuthPayload
    addStudent(input: AddStudentInput!): Student!
    deleteStudent(studentId: ID!): String!
    updateStudent(studentId: ID!, input: AddStudentInput!): Student!
    createClass(input: ClassInput!): Class!
    createUniform(input: UniformInput!): Uniform!
  }

  input AddressInput {
    street: String!
    city: String!
    state: String!
    zip: String!
  }

  input SchoolInput {
    schoolName: String!
    schoolAddress: AddressInput!
  }

  input AddStudentInput {
    firstName: String!
    lastName: String!
    email: String
    phone: String
    grade: String
    instrument: String
    classIds: [ID!]
    uniformIds: [ID!]
  }


  input UniformInput {
    category: String!
    name: String!
    size: String
    condition: UniformCondition!
    quantity: Int
  }

  input ClassInput {
    name: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }
`;
