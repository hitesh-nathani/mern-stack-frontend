import React from "react";
import { useGetUsersQuery } from "./usersApiSlice";
import User from "./User";

function UsersFromRtk() {
  const { data, isLoading, isSuccess, isError, error } = useGetUsersQuery(
    undefined,
    {
      pollingInterval: 60000,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
    }
  );
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
      <div style={{ gap: "1rem", display: "flex", flexDirection: "column" }}>
        <table>
          <thead
            style={{
              backgroundColor: "white",
              margin: "20px 0px",
              color: "black",
            }}
          >
            <tr>
              <th>UserName</th>
              <th>Email</th>
              <th>Roles</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody style={{ backgroundColor: "white", color: "black" }}>
            {tableContent}
          </tbody>
        </table>
      </div>
    );
  }

  return content;
}

export default UsersFromRtk;
