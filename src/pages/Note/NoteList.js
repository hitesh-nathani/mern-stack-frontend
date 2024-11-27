import React, { useEffect } from "react";

function NoteList() {
  const [noteData, setNoteData] = React.useState([]);
  const fetchnoteData = async () => {
    try {
      const response = await fetch("http://localhost:3000/notelist");
      const data = await response.json();
      console.log(data);
      if (data) {
        setNoteData(data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchnoteData();
  }, []);
  return (
    <div>
      <h2>NoteList</h2>
      <div>
        {noteData.map((user) => (
          <div key={user.id}>
            <p>Post Text: {user.text}</p>
            <p>Post Id: {user.postId}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NoteList;
