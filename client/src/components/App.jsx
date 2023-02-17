import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [notes, setNotes] = useState([]);

  async function addNote(newNote) {
    setNotes(prevNotes => {
      return [...prevNotes, newNote];
    })
    try {
      const response = await fetch('https://keeper-api-ivy2.onrender.com/', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ title: newNote.title, content: newNote.content })
      })

      await response.json();
    } catch (error) {
      alert(error)
    }
  }

  function deleteNote(_id) {
    fetch('https://keeper-api-ivy2.onrender.com/', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        _id: _id
      })
    })

  }

  async function findAllNotes() {
    try {
      const Response = await fetch("https://keeper-api-ivy2.onrender.com/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })

      if (Response.ok) {
        const results = await Response.json()
        setNotes(results.data.reverse())
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    findAllNotes()
  }, [notes])



  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {


        notes.map((noteItem, index) => {
          return (
            <Note
              key={index}
              id={index}
              _id={noteItem._id}
              title={noteItem.title}
              content={noteItem.content}
              onDelete={deleteNote}
            />
          );
        })}
      <Footer />
    </div>
  );
}

export default App;

