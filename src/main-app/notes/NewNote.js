import React, { useState } from "react";
import './newNote.css';
import firebase from "../../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import Sidebar from "../../components/sidebar/Sidebar";

function NewNote() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const navigate = useNavigate();

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    }

    const handleContentChange = (e) => {
        setContent(e.target.value);
    }

    const saveNote = async () => {
        if(title && content) {
            try {
                const docRef = await addDoc(collection(firebase.database, "notes"), {
                    title: title,
                    content: content
                });
                console.log("Note added with ID: ", docRef.id);
                navigate("/app/notes");
            } catch (error) {
                console.error("Error adding document: ", error);
            }
        } else {
            alert("Both title and content are required!");
        }
    }

    const deleteNote = () => {
        setTitle("");
        setContent("");
        navigate("/app/notes");
    }

    return (
        <div className="newNote">
            <Sidebar/>
            <div className="newNote-container">

            <h2>Create a New Note</h2>
            <div>
                <input
                    type="text"
                    placeholder="Note Title"
                    value={title}
                    onChange={handleTitleChange}
                />
            </div>
            <div>
                <textarea
                    placeholder="Note Content"
                    value={content}
                    onChange={handleContentChange}
                />
            </div>
            
            <button onClick={deleteNote}>Delete</button>
            <button onClick={saveNote}>Save</button>
            </div>
        </div>
    );
}

export default NewNote;
