import React, { useState , useEffect , useRef } from 'react';
import Box from '@mui/material/Box';
import Masonry from '@mui/lab/Masonry';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ArchiveIcon from '@mui/icons-material/Archive';


function Notes({ notes, onAddNote, onArchive, onTrash , search}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  
  let menuRef = useRef();

  useEffect(() =>{
    let handler = (e) =>{
      if(!menuRef.current.contains(e.target)){
        setIsExpanded(false);
      }
    };
    document.addEventListener("mousedown" ,  handler);

    return() =>{
      document.removeEventListener("mousedown" , handler);
    }
  },[]);
  

  const handleAddNote = () => {
    if (noteTitle || noteContent) {
      onAddNote({
        id: Math.random(),
        title: noteTitle,
        content: noteContent,
      });
      setNoteTitle('');
      setNoteContent('');
      setIsExpanded(false); 
    }
  };
  

  return (
    <div className="notes-section" >
        
      <div ref={menuRef}
        className={`note-input ${isExpanded ? 'expanded' : ''}`}
        onClick={() => setIsExpanded(true)}
      >
        {isExpanded && (
          <input
            type="text"
            placeholder="Title"
            value={noteTitle}
            onChange={(e) => setNoteTitle(e.target.value)}
            className="note-title"
          />
        )}
        <textarea
          placeholder="Take a note..."
          value={noteContent}
          onChange={(e) => setNoteContent(e.target.value)}
          className="note-content"
          onClick={() => setIsExpanded(true)}
        />
        {isExpanded && (
          <div className="note-actions">
            <button onClick={handleAddNote} style={{fontSize:'30px'}}>Add</button>
          </div>
        )}
      </div>
      <div className='display-notes'>
        <Box sx={{ width: 1600, minHeight: 253 }}>
          <Masonry columns={{ xs: 3, sm: 4 }} spacing={2}>
            {notes.filter((note) =>{
              return search.toLowerCase() === '' 
              ? note 
              : (note.title && note.title.toLowerCase().includes(search)) || 
              (note.content && note.content.toLowerCase().includes(search));
            } ).map((note) => (
              <div className="note" key={note.id}>
                <h4>{note.title}</h4>
                <p>{note.content}</p>
                <div className="options">
                  <button onClick={() => onArchive(note.id)} title='Archive'><ArchiveIcon/></button>
                  <button onClick={() => onTrash(note.id)} title='Trash'><DeleteOutlineIcon/></button>
                </div>
              </div>
            ))}
          </Masonry>
        </Box>
      </div>
    </div>
  ); 
}

export default Notes;
