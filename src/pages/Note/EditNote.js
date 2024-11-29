import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectNoteById } from "./notesApiSlice";
import EditNoteForm from "./EditNoteForm";

function EditNote() {
  const { id } = useParams();
  const note = useSelector((state) => selectNoteById(state, id));

  const content = note ? <EditNoteForm note={note} /> : <p>Loading...</p>;

  return content;
}

export default EditNote;
