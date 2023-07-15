import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      email
      token
    }
  }, 
`;

export const REGISTER_USER = gql`
mutation register($email: String!, $password: String!, $confirmPassword: String!) {
  register(email: $email, password: $password, confirmPassword: $confirmPassword) {
    id
    email
    token
  }
}
`;

export const ADD_STUDENT = gql`
  mutation addStudent($firstName: String!, $lastName: String!, $email: String!, $phone: String!, $grade: String!) {
    addStudent(firstName: $firstName, lastName: $lastName, email: $email, phone: $phone, grade: $grade) {
      id
      firstName
      lastName
      email
      phone
      grade
    }
  }
`
