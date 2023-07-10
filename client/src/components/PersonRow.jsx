import React from "react";

export default function PersonRow({ user }) {
  return (
    <tr>
      <td>{user.firstName}</td>
      <td>{user.lastName}</td>
      <td>{user.email}</td>
      <td>{user.organization}</td>
      <td>{user.phone}</td>
      <td>{user.city}</td>
      <td>{user.state}</td>
    </tr>
  );
}
