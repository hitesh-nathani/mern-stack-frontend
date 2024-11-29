import React from "react";
import { useNavigate } from "react-router-dom";
import { useAddNewNoteMutation } from "./notesApiSlice";

function NewNote() {
  const [addNewNote, { isLoading, isSuccess, isError, error }] =
    useAddNewNoteMutation();
  const navigate = useNavigate();
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");

  React.useEffect(() => {
    if (isSuccess) {
      setTitle("");
      navigate("/dash/notes");
    }
  }, [isSuccess, navigate]);

  const onUserNameChanged = (e) => setTitle(e?.target?.value);
  const onPasswordChanged = (e) => setDescription(e?.target?.value);

  const onSaveUserCliked = async (e) => {
    e.preventDefault();
    if (title) {
      await addNewNote({ title, description });
    } else {
      await addNewNote({ title, description });
    }
  };

  let canSave;

  if (title) {
    canSave = [title, description].every(Boolean) && !isLoading;
  }

  const errClass = isError ? "errmsg" : "offscreen";
  const validUserClass = title ? "" : "form__input--incomplete";
  const validPasswordClass = description ? "" : "form__input--incomplete";

  const errContent = isError ? error?.data?.message : "";
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
          <h2>Add Note</h2>
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
      </div>
    </>
  );

  return <div>{content}</div>;
}

export default NewNote;
