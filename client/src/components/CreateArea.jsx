import React, { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';
import { text } from "body-parser";

function CreateArea(props) {

  const [textAreaClick,setClick] = useState(false)

  const [note, setNote] = useState({
    title: "",
    content: ""
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  function submitNote(event) {
    props.onAdd(note);
    setNote({
      title: "",
      content: ""
    });
    event.preventDefault();
  }

  function handleClick(){
    setClick(true)

  }

  return (
    <div>
      <form className="create-note">
        {
          textAreaClick &&  <input
          name="title"
          onChange={handleChange}
          value={note.title}
          placeholder="Title"
          autoFocus="true"
        />
        }
        
        <textarea
          onClick={handleClick}
          name="content"
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows={ textAreaClick ? "3" : "1"}
        />
        {
          textAreaClick ? <Zoom in={true}>
        <Fab onClick={submitNote}>
          <AddIcon />
        </Fab>
        </Zoom> : null
        }
        
      </form>
    </div>
  );
}

export default CreateArea;
