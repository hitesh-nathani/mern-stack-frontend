import React, { useEffect } from "react";
import Note from "./Note";

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

  const tableContent = noteData?.length
    ? noteData.map((note) => <Note key={note.id} userId={note.id} />)
    : null;

  const content = (
    <div style={{ gap: "1rem", display: "flex", flexDirection: "column" }}>
      <table>
        <thead
          style={{
            backgroundColor: "white",
            margin: "20px 0px",
            color: "black",
          }}
        >
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody style={{ backgroundColor: "white", color: "black" }}>
          {tableContent}
        </tbody>
      </table>
    </div>
  );
  return (
    <div>
      <h2>NoteList</h2>
      {/* <div>
        {noteData.map((user) => (
          <div key={user.id}>
            <p>Post Text: {user.text}</p>
            <p>Post Id: {user.postId}</p>
            <Note userId={user.id} />
          </div>
        ))}
      </div> */}
      {content}
    </div>
  );
}

export default NoteList;
