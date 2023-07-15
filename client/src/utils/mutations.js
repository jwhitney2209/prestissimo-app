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

export const CREATE_PERSON = gql`
  mutation createPerson($firstName: String!, $lastName: String!, $email: String!, $phone: String!, $grade: String!) {
    createPerson(firstName: $firstName, lastName: $lastName, email: $email, phone: $phone, grade: $grade) {
      id
      firstName
      lastName
      email
      phone
      grade
    }
  }
`
