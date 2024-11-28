import React from "react";
import { useAddNewUserMutation } from "./usersApiSlice";
import { ROLES } from "../../config/roles";
import { useNavigate } from "react-router-dom";

function NewUserForm() {
  const USER_REGEX = /^[A-z]{3,20}$/;
  const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;

  const [addNewUser, { isLoading, isSuccess, isError, error }] =
    useAddNewUserMutation();

  const navigate = useNavigate();
  const [userName, setUserName] = React.useState("");
  const [validUserName, setValidUserName] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [validPassword, setValidPassword] = React.useState(false);
  const [roles, setRoles] = React.useState(["Employee"]);

  React.useEffect(() => {
    setValidUserName(USER_REGEX.test(userName));
  }, [userName]);

  React.useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
  }, [password]);

  React.useEffect(() => {
    if (isSuccess) {
      setUserName("");
      setPassword("");
      setRoles([]);
      navigate("/dash/users");
    }
  }, [isSuccess, navigate]);

  const onUserNameChanged = (e) => setUserName(e?.target?.value);
  const onPasswordChanged = (e) => setPassword(e?.target?.value);

  const onRolesChanged = (e) => {
    const values = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setRoles(values);
  };

  const canSave =
    [roles.length, validUserName, validPassword].every(Boolean) && !isLoading;
  console.log(
    "🚀 ~ NewUserForm ~ canSave:",
    roles.length,
    validUserName,
    validPassword,
    canSave
  );

  const onSaveUserCliked = async (e) => {
    e.preventDefault();
    if (canSave) {
      await addNewUser({ userName, password, roles });
    }
  };

  const options = Object.values(ROLES).map((role) => {
    return (
      <option key={role} value={role}>
        {role}
      </option>
    );
  });

  const errClass = isError ? "errmsg" : "offscreen";
  const validUserClass = validUserName ? "" : "form__input--incomplete";
  const validPasswordClass = validPassword ? "" : "form__input--incomplete";
  const validRolesClass = roles?.length ? "" : "form__input--incomplete";

  const content = (
    <form
      className="form"
      onSubmit={onSaveUserCliked}
      style={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "500px",
        alignItems: "flex-start",
      }}
    >
      <div className="form__title-row">
        <h2>New User</h2>
        <div className={errClass}>{error?.data?.message}</div>
      </div>
      <label className="form__label" htmlFor="username">
        Username: <span className="nowrap">[3-20 letters]</span>
      </label>
      <input
        className={`form__input ${validUserClass}`}
        id="username"
        name="username"
        type="text"
        value={userName}
        onChange={onUserNameChanged}
      />

      <label className="form__label" htmlFor="password">
        Password: <span className="nowrap">[4-12 chars incl. !@#$%]</span>
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
        ASSIGNED ROLES:
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

      <div className="form__button-row">
        <button disabled={!canSave} type="submit">
          Save
        </button>
      </div>
    </form>
  );

  return <div>{content}</div>;
}

export default NewUserForm;
