import React from "react";
import './notes.css';
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import Sidebar from "../../components/sidebar/Sidebar";

function Notes() {

    const navigate = useNavigate();

    function goToNewNotePage() {
        navigate("/app/notes/new-note");
    }

    return (
        <div className="notes">
            <Sidebar />
            <button className="add-note-button" onClick={goToNewNotePage}>
                <FaPlus className="newNote-icon"></FaPlus>
                <span className="button-text">Add New Note</span>
            </button>
        </div>
    )
}

export default Notes;