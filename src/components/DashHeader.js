import React from "react";
import { Link } from "react-router-dom";

function DashHeader() {
  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "20px 10px",
      }}
    >
      <div>
        <h1>TechNotes</h1>
      </div>
      <div>
        <div>
          <p>{new Date().toLocaleDateString()}</p>
        </div>
        <div>
          <h2>Welcome</h2>
        </div>
      </div>
      <div
        style={{
          margin: "1rem",
          display: "flex",
          gap: "1rem",
        }}
      >
        <Link to="/dash/users">Users</Link>
        <Link to="/dash/notes">Notes</Link>
      </div>
    </div>
  );
}

export default DashHeader;
