import React from "react";
import { Link } from "react-router-dom";

function Public() {
  return (
    <div>
      <header>
        <h1>Header</h1>
        <Link to={"/dash"}>DashBoard</Link>
      </header>
      <div>
        <p>
          This is the public page. Welcome to our website where you can find
          various resources and information.
        </p>
        <p>This is the public page.</p>
      </div>
      <footer>
        <p>Footer</p>
      </footer>
    </div>
  );
}

export default Public;
