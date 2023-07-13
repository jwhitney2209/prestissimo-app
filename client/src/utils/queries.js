import { gql } from '@apollo/client';

const GET_PERSONS_BASIC_INFO = gql`
  query getPersons {
  getPersons {
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

export { GET_PERSONS_BASIC_INFO }