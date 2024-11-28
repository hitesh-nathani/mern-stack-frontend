import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Public from "./components/Public";
import Login from "./components/Login";
import DashLayout from "./components/DashLayout";
// import UserList from "./pages/User/UserList";
import NoteList from "./pages/Note/NoteList";
import UsersFromRtk from "./pages/User/UsersFromRtk";
import NewUserForm from "./pages/User/NewUserForm";
import EditUser from "./pages/User/EditUser";
import NewNote from "./pages/Note/NewNote";
import EditNote from "./pages/Note/EditNote";
import Prefetch from "./feature/auth/Prefetch";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Public />} />
        <Route path="/login" element={<Login />} />
        <Route element={<Prefetch />}>
          <Route path="dash" element={<DashLayout />}>
            <Route path="users">
              {/* <Route index element={<UserList />} /> */}
              <Route index element={<UsersFromRtk />} />
              <Route path="new" element={<NewUserForm />} />
              <Route path=":id" element={<EditUser />} />
            </Route>

            <Route path="notes">
              <Route index element={<NoteList />} />
              <Route path="new" element={<NewNote />} />
              <Route path=":id" element={<EditNote />} />
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
