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
            <button className="add-note-button" onClick={goToNewNotePage}>
                <FaPlus className="newNote-icon"></FaPlus>
                <span className="button-text">Add New Note</span>
            </button>

            {/* {notes.length ? (
                notes.map(note => (

                ))
            ) : (
                <p>No notes yet! Create one now!</p>
            )} */}
        </div>
    )
}

export default Notes;