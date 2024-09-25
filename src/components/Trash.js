import React from "react";
import Box from '@mui/material/Box';
import Masonry from '@mui/lab/Masonry';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

function Trash({ trashedNotes, onRestore, onDelete ,search}) {
  return (
    <div className="trash-section">
      {trashedNotes.length === 0 ? (
        <p className="empty-trash" style={{position:'relative' , left:'500px' , fontSize:'50px' , color:'LightGrey'}}><DeleteOutlinedIcon style={{ fontSize: '400px' , }} className="trash-icon"/> <br/> No notes in trash</p>
      ) : (
        <Box sx={{ width: 800, minHeight: 253 }}>
      <Masonry columns={4} spacing={2}>
        {trashedNotes.filter((note) =>{
              return search.toLowerCase() === '' 
              ? note 
              : (note.title && note.title.toLowerCase().includes(search)) || 
              (note.content && note.content.toLowerCase().includes(search));
            } ).map((note) => (
          <div className="note" key={note.id}>
            <h4>{note.title}</h4>
            <p>{note.content}</p>
            <div className="options">
              <button onClick={() => onRestore(note.id)} title="Recover"><RestoreFromTrashIcon/></button>
              <button onClick={() => onDelete(note.id)} title="Permanently Delete"><DeleteForeverIcon/></button>
            </div>
          </div>
        ))}
        </Masonry>
        </Box>
      )}
    </div>
  );
}

export default Trash;
