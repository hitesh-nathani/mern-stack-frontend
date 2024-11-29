import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectNoteById } from "./notesApiSlice";

function Note({ userId }) {
  console.log("🚀 ~ Note ~ userId:", userId);
  const user = useSelector((state) => selectNoteById(state, userId));
  const navigate = useNavigate();

  if (user) {
    const handleEdit = () => navigate(`/dash/notes/${userId}`);

    return (
      <tr className="table__row user">
        {/* <td>{user?.name}</td> */}
        <td>{user?.title}</td>
        <td>{user?.description}</td>
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

export default Note;
