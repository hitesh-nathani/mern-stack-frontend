import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function Post() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  console.log(`hello ~ file: App.js:62 ~ Users ~ id:`, location, id, navigate);
  //   const handleNavigate = () => {
  //     navigate("/about?queryParam=value", {
  //       state: { id: 123, name: "John Doe" },
  //     });
  //   };
  return (
    <div>
      <h1>User Details</h1>
      <p>User ID: {id}</p>
    </div>
  );
}

export default Post;
