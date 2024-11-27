import React from "react";
import { useGetUsersQuery } from "./usersApiSlice";
import User from "./User";

function UsersFromRtk() {
  const { data, isLoading, isSuccess, isError, error } = useGetUsersQuery();
  console.log("🚀 ~ UserList ~ users:", data, isSuccess);
  let content;

  if (isLoading) content = <p>Loading...</p>;

  if (isError) {
    content = <p>{error?.data?.message}</p>;
  }

  if (isSuccess) {
    const { ids } = data;

    const tableContent = ids?.length
      ? ids.map((userId) => <User key={userId} userId={userId} />)
      : null;

    content = (
      <table>
        <thead>
          <tr>
            <th>UserName</th>
            <th>Roles</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>{tableContent}</tbody>
      </table>
    );
  }

  return content;
}

export default UsersFromRtk;
