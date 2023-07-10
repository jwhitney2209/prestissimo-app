import { gql, useQuery } from "@apollo/client";
import PersonRow from "./PersonRow";

const GET_USERS = gql`
  query getUsers {
    getUsers {
    id
    firstName
    lastName
    email
    organization
    phone
    street
    city
    state
    zip
  }
  }
`;

export default function Persons() {
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <>
      {!loading && !error && (
        <table className="table-fixed">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Organization</th>
              <th>Phone</th>
              <th>City</th>
              <th>State</th>
            </tr>
          </thead>
          <tbody>
            {data.getUsers.map((user) => (
              <PersonRow key={user.id} user={user} />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
