import React from "react";
import { store } from "../../app/store";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { usersApiSlice } from "../../pages/User/usersApiSlice";
// import { notesApiSlice } from "../../pages/Note/notesApiSlice";

function Prefetch() {
  useEffect(() => {
    console.log("subscribe");
    // const notes = store.dispatch(notesApiSlice.endpoints.getNotes.initiate());
    const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate());

    return () => {
      console.log("unsubscribed");
      // notes.unsubscribe();
      users.unsubscribe();
    };
  }, []);
  return <Outlet />;
}

export default Prefetch;
