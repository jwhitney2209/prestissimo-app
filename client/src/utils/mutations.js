import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
mutation loginUser($email: String!, $password: String!) {
  loginUser(email: $email, password: $password) {
    token
    user {
      id
      email
      createdAt
      isVerified
    }
  }
}
`;

export const REGISTER_USER = gql`
  mutation createUser(
    $email: String!
    $password: String!
    $confirmPassword: String!
    $firstName: String!
    $lastName: String!
    $school: SchoolInput
    $address: AddressInput
  ) {
    createUser(
      email: $email
      password: $password
      confirmPassword: $confirmPassword
      firstName: $firstName
      lastName: $lastName
      school: $school
      address: $address
    ) {
      user {
        id
        email
        isVerified
      }
    }
  }
`;

export const VERIFY_USER = gql`
  mutation verifyUser($token: String!) {
    verifyUser(token: $token) {
      user {
        id
        firstName
        lastName
        createdAt
        email
        isVerified
      }
      token
    }
  }
`;

export const ADD_STUDENT = gql`
  mutation addStudent($input: AddStudentInput!) {
    addStudent(input: $input) {
      id
      firstName
      lastName
      userId
      grade
      phone
      email
      createdAt
      instrument
    }
  }
`;

export const DELETE_STUDENT = gql`
  mutation deleteStudent($studentId: ID!) {
    deleteStudent(studentId: $studentId)
  }
`;

export const UPDATE_STUDENT = gql`
mutation updateStudent($studentId: ID!, $input: AddStudentInput!) {
  updateStudent(studentId: $studentId, input: $input) {
    id
    firstName
    lastName
    email
    phone
    grade
    instrument
  }
}
`;

export const ADD_UNIFORM = gql`
  mutation addUniform(
    $category: String!
    $name: String!
    $size: String!
    $quantity: Int
  ) {
    addUniform(
      category: $category
      name: $name
      size: $size
      quantity: $quantity
    ) {
      id
      category
      name
      size
      quantity
    }
  }
`;

export const ADD_UNIFORM_CATEGORY = gql`
  mutation Mutation($categoryName: String!) {
    addUniformCategory(categoryName: $categoryName) {
      id
      categoryName
      createdAt
      userId
    }
  }
`;

export const ASSIGN_UNIFORM_TO_STUDENT = gql`
  mutation assignUniformToStudent($studentId: ID!, $uniformId: ID!) {
    assignUniformToStudent(studentId: $studentId, uniformId: $uniformId) {
      id
      firstName
      lastName
      uniforms {
        id
        name
        size
      }
    }
  }
`;

export const DELETE_UNIFORM = gql`
  mutation deleteUniform($uniformId: ID!) {
    deleteUniform(uniformId: $uniformId)
  }
`;

export const CONVERT_CSV_TO_JSON = gql`
  mutation convertCSV($url: String!) {
    convertCSV(url: $url)
  }
`;
