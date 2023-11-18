import React from "react";
import './notes.css';
import Sidebar from "../../components/sidebar/Sidebar";

function Notes() {
    return (
        <div className="notes">
            <Sidebar />
            <button className="add-note-button">Add New Note</button>
        </div>
    )
}

export default Notes;