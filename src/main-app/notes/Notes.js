import React, { useEffect, useState } from "react";
import './notes.css';
import { useNavigate } from "react-router-dom";
import { getDocs, collection } from "firebase/firestore";
import firebase from "../../firebase/firebase";
import { FaPlus } from "react-icons/fa";
import Sidebar from "../../components/sidebar/Sidebar";

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