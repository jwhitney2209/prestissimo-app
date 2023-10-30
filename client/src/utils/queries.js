import { gql } from "@apollo/client";

const GET_STUDENTS = gql`
  query getStudents {
    getStudents {
      id
      firstName
      lastName
      grade
      email
      phone
    }
  }
`;

const GET_STUDENT = gql`
  query GetStudent($studentId: ID!) {
    getStudent(studentId: $studentId) {
      id
      firstName
      lastName
      email
      phone
      uniforms {
        name
        size
      }
      ensembles {
        name
      }
      accountBalance
      grade
      section {
        name
      }
    }
  }
`;

const GET_UNIFORMS = gql`
query getUniforms {
  getUniforms {
    id
    name
    size
    assignedTo {
      id
      firstName
      lastName
    }
    condition
    category
    createdAt
  }
}
`;

const GET_UNIFORM = gql`
query getUniform($uniformId: ID!) {
  getUniform(uniformId: $uniformId) {
    id
    name
    size
    userId
    createdAt
    category
    assignedTo {
      firstName
      lastName
    }
  }
}`;

const GET_UNIFORM_CATEGORIES = gql`
  query GetUniformCategories {
    getUniformCategories {
      id
      categoryName
      createdAt
      userId
    }
  }
`;

export { GET_STUDENTS, GET_STUDENT, GET_UNIFORMS, GET_UNIFORM, GET_UNIFORM_CATEGORIES };
