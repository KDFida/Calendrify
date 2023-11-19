import React from "react";
import './notes.css';
import { FaPlus } from "react-icons/fa";
import Sidebar from "../../components/sidebar/Sidebar";

function Notes() {
    return (
        <div className="notes">
            <Sidebar />
            <button className="add-note-button">
                <FaPlus className="newNote-icon"></FaPlus>
                <span className="button-text">Add New Note</span>
            </button>
        </div>
    )
}

export default Notes;