import React, { useEffect } from "react";

function Home() {
  const [postData, setPostData] = React.useState();
  const fetchPostData = async () => {
    try {
      const response = await fetch("http://localhost:3000/posts");
      const data = await response.json();
      console.log(data);
      if (data) {
        setPostData(data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchPostData();
  }, []);
  return (
    <div>
      Home
      <div style={styles.postDetails}>
        {postData?.map((e) => {
          console.log(e);
          return (
            <div key={e?.id} style={styles.postinner}>
              <p>{e?.id}</p>
              <p>{e?.title}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const styles = {
  postDetails: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  postinner: {
    display: "flex",
    gap: "5px",
    maxWidth: "400px",
    border: "1px solid black",
    borderRadius: "5px",
    cursor: "pointer",
    alignItems: "center",
  },
};

export default Home;
