import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserById } from "./usersApiSlice";

function User({ userId }) {
  const user = useSelector((state) => selectUserById(state, userId));
  const navigate = useNavigate();

  if (user) {
    const handleEdit = () => navigate(`/dash/users/${userId}`);
    const userRolesString = user.roles.toString().replaceAll(",", ",");
    const cellStatus = user.active ? "" : "table__cell--inactive";

    return (
      <tr className="table__row user">
        {/* <td>{user?.name}</td> */}
        <td>{user?.userName}</td>
        <td>{user?.email}</td>
        <td>{userRolesString}</td>
        <td>
          <button
            className="icon-button table__cell--edit"
            onClick={handleEdit}
          >
            Edit{" "}
          </button>
        </td>
      </tr>
    );
  } else return null;
}

export default User;
