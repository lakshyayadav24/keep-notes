import React, { useState } from "react";
import Notes from "./components/Notes";
import Archive from "./components/Archive";
import Trash from "./components/Trash";
import Header from "./components/Header";
import './App.css';

function App() {
  const [activeComponent, setActiveComponent] = useState("notes");
  const [archivedNotes, setArchivedNotes] = useState([]);
  const [notes, setNotes] = useState([]);
  const [trashedNotes, setTrashedNotes] = useState([]);
  const [search , setSearch] =useState('');
  
  const handleAddNote = (note) => {
    setNotes([...notes, note]);
  };

  const moveToArchive = (id) => {
    const note = notes.find(note => note.id === id);
    setNotes(notes.filter(note => note.id !== id));
    setArchivedNotes([...archivedNotes, note]);
  };

  const moveToTrash = (id) => {
    const note = notes.find(note => note.id === id) || archivedNotes.find(note => note.id === id);
    if (notes.find(note => note.id === id)) {
      setNotes(notes.filter(note => note.id !== id));
    } else {
      setArchivedNotes(archivedNotes.filter(note => note.id !== id));
    }
    setTrashedNotes([...trashedNotes, note]);
  };

  const moveFromArchiveToNotes = (id) => {
    const note = archivedNotes.find(note => note.id === id);
    setArchivedNotes(archivedNotes.filter(note => note.id !== id));
    setNotes([...notes, note]);
  };

  const moveFromTrashToNotes = (id) => {
    const note = trashedNotes.find(note => note.id === id);
    setTrashedNotes(trashedNotes.filter(note => note.id !== id));
    setNotes([...notes, note]);
  };

  const deletePermanently = (id) => {
    setTrashedNotes(trashedNotes.filter(note => note.id !== id));
  };

  return (
    <div className="app">
      <Header search={search} setSearch={setSearch} />
      <div className="app-container">
        <header>
      
          <nav className="sidebar">
            <button onClick={() => setActiveComponent("notes")}>Notes</button>
            <button onClick={() => setActiveComponent("archive")}>Archive</button>
            <button onClick={() => setActiveComponent("trash")}>Trash</button>
          </nav>
        </header>
        <main className="content">
          {activeComponent === "notes" && (
            <Notes
              notes={notes}
              onAddNote={handleAddNote}
              onArchive={moveToArchive}
              onTrash={moveToTrash}
              search={search}
            />
          )}
          {activeComponent === "archive" && (
            <Archive
              archivedNotes={archivedNotes}
              onRestore={moveFromArchiveToNotes}
              onTrash={moveToTrash}
              search={search}
            />
          )}
          {activeComponent === "trash" && (
            <Trash
              trashedNotes={trashedNotes}
              onRestore={moveFromTrashToNotes}
              onDelete={deletePermanently}
              search={search}
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
