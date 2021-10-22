import {useState, useEffect} from 'react';
import uuid from 'react-uuid';
import './App.css';
import Sidebar from './Sidebar';
import Main from './Main';

function App() {

  const [notes, setNotes] = useState(JSON.parse(localStorage.notes) || []);
  const [activeNote, setActiveNote] = useState(false);
  useEffect(() =>{
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);


  const onDeleteNote = (idToDelete) => {
    setNotes(notes.filter((note) => note.id !== idToDelete));
  }
  const getActiveNote = () => {
    return notes.find((note) => note.id === activeNote);
  };

  const onUpdateNote = (updatedNote) => {
    const updatedNotesArray = notes.map((note) => {
      if(note.id === activeNote)
      {
        return updatedNote;
      }
      return note;
    });
    setNotes(updatedNotesArray);
  };

  const onAddNote = () => {
    const newNote = {
      id: uuid(),
      title: "Untitled note",
      note: "",
      lastModified: Date.now(),
    }
    setNotes([newNote, ...notes]);
  };


  return (
    <div className='App'>
      <Sidebar activeNote={activeNote} setActiveNote={setActiveNote} notes={notes} onAddNote={onAddNote} onDeleteNote={onDeleteNote} />
      <Main activeNote={getActiveNote()} onUpdateNote={onUpdateNote} />
    </div>
  )
}

export default App;
