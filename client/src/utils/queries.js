import { gql } from '@apollo/client';

const GET_STUDENTS = gql`
  query getStudents {
  getStudents {
    id
    firstName
    lastName
    grade
    email
    phone
    grade
  }
}
`

export { GET_STUDENTS }