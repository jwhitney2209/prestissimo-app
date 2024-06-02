module.exports = `#graphql
type Address {
  street: String
  city: String
  state: String
  zip: String
}

# Program Type
type Program {
  id: ID!
  name: String!
  school: String!
  address: Address
  users: [User!]!
  students: [Student!]!
  parents: [Parent!]!
}

# Student Type
type Student {
  id: ID!
  firstName: String!
  lastName: String!
  email: String!
  phoneNumber: String
  program: Program!
  parents: [Parent!]!
}

# Parent Type
type Parent {
  id: ID!
  firstName: String!
  lastName: String!
  email: String!
  phoneNumber: String
  students: [Student!]!
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
}
type InvitationResponse {
  message: String!
  success: Boolean!
  invitation: Invitation
}
`;
