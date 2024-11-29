import React from "react";
import { useNavigate } from "react-router-dom";
import { useDeleteNoteMutation, useUpdateNoteMutation } from "./notesApiSlice";

function EditNoteForm({ note }) {
  const [updateNote, { isLoading, isSuccess, isError, error }] =
    useUpdateNoteMutation();
  const [
    deleteNote,
    { isSuccess: isDelSuccess, isError: isDelError, error: dellerror },
  ] = useDeleteNoteMutation();

  const navigate = useNavigate();
  const [title, setTitle] = React.useState(note.title);
  const [description, setDescription] = React.useState(note.title);

  React.useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setTitle("");
      navigate("/dash/notes");
    }
  }, [isSuccess, isDelSuccess, navigate]);

  const onUserNameChanged = (e) => setTitle(e?.target?.value);
  const onPasswordChanged = (e) => setDescription(e?.target?.value);

  const onSaveUserCliked = async (e) => {
    e.preventDefault();
    if (title) {
      await updateNote({ id: note.id, title, description });
    } else {
      await updateNote({ id: note.id, title, description });
    }
  };

  const onDeleteNoteClicked = async (e) => {
    e.preventDefault();
    await deleteNote({ id: note.id });
  };

  let canSave;

  if (title) {
    canSave = [title, description].every(Boolean) && !isLoading;
  }

  const errClass = isError || isDelError ? "errmsg" : "offscreen";
  const validUserClass = title ? "" : "form__input--incomplete";
  const validPasswordClass = description ? "" : "form__input--incomplete";

  const errContent =
    isError || isDelError
      ? error?.data?.message || dellerror?.data?.message
      : "";
  const content = (
    <>
      <p className={errClass}>{errContent}</p>

      <form
        className="form"
        onSubmit={(e) => e.preventDefault()}
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "500px",
          alignItems: "flex-start",
        }}
      >
        <div className="form__title-row">
          <h2>Edit Note</h2>
        </div>
        <label className="form__label" htmlFor="userName">
          Title: <span className="nowrap">[3-20 letters]</span>
        </label>
        <input
          className={`form__input ${validUserClass}`}
          id="title"
          name="title"
          type="text"
          autoComplete="off"
          value={title}
          onChange={onUserNameChanged}
        />
        <label className="form__label" htmlFor="description">
          Description: <span className="nowrap">[empty = no change]</span>
        </label>
        <input
          className={`form__input ${validPasswordClass}`}
          id="description"
          name="description"
          value={description}
          onChange={onPasswordChanged}
        />
      </form>
      <div className="form__action-buttons">
        <button
          onClick={onSaveUserCliked}
          className="icon-button"
          title="Save"
          disabled={!canSave}
        >
          Save
        </button>
        <button
          className="icon-button"
          title="Delete"
          onClick={onDeleteNoteClicked}
        >
          Delete
        </button>
      </div>
    </>
  );

  return <div>{content}</div>;
}

export default EditNoteForm;
