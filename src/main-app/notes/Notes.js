import React, { useEffect, useState } from "react";
import './notes.css';
import { useNavigate } from "react-router-dom";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import firebase from "../../firebase/firebase";
import { FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Sidebar from "../../components/sidebar/Sidebar";
import { toast } from "react-toastify";

function Notes() {

    const [notes, setNotes] = useState([]);
    const navigate = useNavigate();

    function goToNewNotePage() {
        navigate("/app/notes/new-note");
    }

    useEffect(() => {
        fetchNotes();
    }, []);

    function fetchNotes() {
        const { database } = firebase;

        getDocs(collection(database, "notes"))
            .then((querySnapshot) => {
                const notesArray = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setNotes(notesArray);
            })
    }

    function deleteNote(noteId) {
        const { database } = firebase;
        const noteRef = doc(database, "notes", noteId);
      
        deleteDoc(noteRef)
          .then(() => {
            toast.success("Note Deleted Successfully");
            setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId));
          })
          .catch(error => {
            toast.error("Error Deleting Document: ", error);
          });
      }

    return (
        <div className="notes">
            <Sidebar />
            <div className="title">
                <h1>Notes</h1>
            </div>
            <div className="notes-content">
                <div className="notes-header">
                    <button className="add-note-button" onClick={goToNewNotePage}>
                        <FaPlus className="newNote-icon"></FaPlus>
                        <span className="button-text">Add New Note</span>
                    </button>
                </div>

                <div className="notes-grid">
                    {notes.length > 0 ? (
                        notes.map(note => (
                            <div key={note.id} className="note-card">
                                <h2 className="note-title">{note.title}</h2>
                                <p className="note-content">{note.content}</p>
                                <button onClick={() => deleteNote(note.id)}>
                                    <MdDelete
                                        size={18}
                                    />
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="no-notes">No notes yet! Create one now!</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Notes;