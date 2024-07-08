module.exports = `#graphql
type Address {
  street: String
  city: String
  state: String
  zip: String
}

type Program {
  id: ID!
  name: String!
  school: String!
  address: Address
  users: [User!]!
  students: [Student!]!
  parents: [Parent!]!
}

type Student {
  id: ID!
  firstName: String!
  lastName: String!
  email: String!
  phoneNumber: String
  program: Program!
  parents: [Parent!]!
  financial: Financial
}

type Parent {
  id: ID!
  firstName: String!
  lastName: String!
  email: String!
  phoneNumber: String
  students: [Student!]!
  program: Program!
}

type Financial {
  id: ID!
  balance: Float!
  payments: [Payment!]!
}

type Payment { 
  id: ID!
  amount: Float!
  date: String!
  description: String
}

type User {
  id: ID!
  email: String!
  firstName: String
  lastName: String
  role: Role!
  program: Program!
  isVerified: Boolean!
  createdAt: String
}

enum Role {
  admin
  staff
  parent
}

type Invitation {
  id: ID!
  email: String!
  program: Program!
  token: String!
  expires: String!
}

type AuthPayload {
  token: String!
  user: User!
  program: Program!
}

type CreateUserAndProgramPayload {
  user: User!
  program: Program!
}

type Query {
  program(id: ID!): Program
  studentsByProgram(programId: ID!): [Student!]!
}

type Mutation {
  # file upload
  convertCSV(url: String!): String
  # user mutations
  verifyUser(token: String!): AuthPayload
  sendInvitation(email: String!, programId: ID!, role: String!): InvitationResponse
  registerUserWithToken(email: String!, password: String!, confirmPassword: String!, firstName: String!, lastName: String!, token: String!): AuthPayload
  loginUser(email: String!, password: String!): AuthPayload
  createUserAndProgram(email: String!, password: String!, confirmPassword: String!, firstName: String!, lastName: String!, programName: String!, school: String!): CreateUserAndProgramPayload
  # student mutations
  addStudent(firstName: String!, lastName: String!, email: String!, phoneNumber: String, programId: ID!, parentIds: [ID], financial: FinancialInput): Student
  addPayment(studentId: ID!, amount: Float!, description: String): Financial

}
type InvitationResponse {
  message: String!
  success: Boolean!
  invitation: Invitation
}

input FinancialInput {
  balance: Float!
  payments: [PaymentInput!]
}

input PaymentInput {
  amount: Float!
  description: String
}

`;
