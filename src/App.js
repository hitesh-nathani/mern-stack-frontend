import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Public from "./components/Public";
import Login from "./components/Login";
import DashLayout from "./components/DashLayout";
import UserList from "./pages/User/UserList";
import NoteList from "./pages/Note/NoteList";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Public />} />
        <Route path="/login" element={<Login />} />
        <Route path="dash" element={<DashLayout />}>
          <Route path="users">
            <Route index element={<UserList />} />
          </Route>

          <Route path="notes">
            <Route index element={<NoteList />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
