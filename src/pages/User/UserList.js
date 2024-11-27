import React, { useEffect, useState } from "react";

function UserList() {
  const [userData, setUser] = React.useState([]);
  const [userDetails, setuserDetails] = React.useState({});
  const [loading, setLoading] = useState(false);
  const fetchuserData = async () => {
    try {
      const response = await fetch("http://localhost:3000/userlist/");
      const data = await response.json();
      console.log(data);
      if (data) {
        setUser(data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPrUser = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/userlist/${id}`);
      const data = await response.json();
      console.log(data);
      if (data) {
        setuserDetails(data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      fetchuserData();
    }, 1000);
  }, []);

  useEffect(() => {}, []);
  return (
    <div>
      <h2>UserList</h2>
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <div>
          {userData.map((user) => (
            <div
              key={user.id}
              onClick={() => {
                fetchPrUser(user?.id);
              }}
            >
              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
            </div>
          ))}
        </div>
      )}
      <div>
        {userDetails?.name && (
          <div>
            <h3>Particular details</h3>
            <p>{userDetails?.name}</p>
            <p>{userDetails?.email}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserList;
