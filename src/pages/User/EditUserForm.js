import React from "react";
import { useUpdateUserMutation, useDeleteUserMutation } from "./usersApiSlice";
import { useNavigate } from "react-router-dom";
import { ROLES } from "../../config/roles";

function EditUserForm({ user }) {
  const [updateUser, { isLoading, isSuccess, isError, error }] =
    useUpdateUserMutation();
  const [
    deleteUser,
    { isSuccess: isDelSuccess, isError: isDelError, error: dellerror },
  ] = useDeleteUserMutation();

  const USER_REGEX = /^[A-a]{3,20}$/;
  const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;

  const navigate = useNavigate();
  const [userName, setUserName] = React.useState(user.userName);
  const [validUserName, setValidUserName] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [validPassword, setValidPassword] = React.useState(false);
  const [roles, setRoles] = React.useState(user.roles);
  const [active, setActive] = React.useState(user.active);

  React.useEffect(() => {
    setValidUserName(USER_REGEX.test(userName));
  }, [userName]);

  React.useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
  }, [password]);

  React.useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setUserName("");
      setPassword("");
      setRoles([]);
      navigate("/dash/users");
    }
  }, [isSuccess, isDelSuccess, navigate]);

  const onUserNameChanged = (e) => setUserName(e?.target?.value);
  const onPasswordChanged = (e) => setPassword(e?.target?.value);

  const onActiveChanged = (e) => setActive((prev) => !prev);

  const onRolesChanged = (e) => {
    const values = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setRoles(values);
  };

  const onSaveUserCliked = async (e) => {
    e.preventDefault();
    if (password) {
      await updateUser({ id: user.id, userName, password, roles, active });
    } else {
      await updateUser({ id: user.id, userName, roles, active });
    }
  };

  const onDeleteUserCliked = async (e) => {
    e.preventDefault();
    await deleteUser({ id: user.id });
  };

  const options = Object.values(ROLES).map((role) => {
    return (
      <option key={role} value={role}>
        {role}
      </option>
    );
  });

  let canSave;

  if (password) {
    canSave =
      [roles.length, validUserName, validPassword].every(Boolean) && !isLoading;
  } else {
    canSave = [roles.length, validUserName].every(Boolean) && !isLoading;
  }

  const errClass = isError || isDelError ? "errmsg" : "offscreen";
  const validUserClass = validUserName ? "" : "form__input--incomplete";
  const validPasswordClass = validPassword ? "" : "form__input--incomplete";
  const validRolesClass = roles?.length ? "" : "form__input--incomplete";

  const errContent =
    isError || isDelError
      ? error?.data?.message || dellerror?.data?.message
      : "";
  const content = (
    <>
      <p className={errClass}>{errContent}</p>

      <form className="form" onSubmit={(e) => e.preventDefault()}>
        <div className="form__title-row">
          <h2>Edit User</h2>
          <div className="form__action-buttons">
            <button
              onClick={onSaveUserCliked}
              className="icon-button"
              title="Save"
              // disabled={!canSave}
            >
              Save
            </button>
            <button
              className="icon-button"
              title="Delete"
              onClick={onDeleteUserCliked}
            >
              Delete
            </button>
          </div>
        </div>
        <label className="form__label" htmlFor="userName">
          UserName: <span className="nowrap">[3-20 letters]</span>
        </label>
        <input
          className={`form__input ${validUserClass}`}
          id="userName"
          name="userName"
          type="text"
          autoComplete="off"
          value={userName}
          onChange={onUserNameChanged}
        />
        <label className="form__label" htmlFor="password">
          Password: <span className="nowrap">[empty = no change]</span>
        </label>
        <input
          className={`form__input ${validPasswordClass}`}
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={onPasswordChanged}
        />
        <label className="form__label" htmlFor="roles">
          Roles:
        </label>
        <select
          id="roles"
          name="roles"
          className={`form__select ${validRolesClass}`}
          multiple={true}
          size="3"
          value={roles}
          onChange={onRolesChanged}
        >
          {options}
        </select>
        <label
          className="form__label form__checkbox-container"
          htmlFor="user-active"
        >
          Active
        </label>
        <input
          className="form__checkbox"
          id="user-active"
          name="user-active"
          type="checkbox"
          checked={active}
          onChange={onActiveChanged}
        />
      </form>
    </>
  );

  return <div>{content}</div>;
}

export default EditUserForm;
