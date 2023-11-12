import { gql } from "@apollo/client";

const GET_STUDENTS = gql`
query getStudents {
  getStudents {
    id
    firstName
    lastName
    userId
    email
    grade
    instrument
    phone
    createdAt
  }
}
`;

const GET_STUDENT = gql`
query getStudent($studentId: ID!) {
  getStudent(studentId: $studentId) {
    id
    firstName
    lastName
    email
    phone
    grade
    instrument
    createdAt
    classes {
      id
      name
    }
    uniforms {
      id
      name
      quantity
      size
      condition
      createdAt
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
