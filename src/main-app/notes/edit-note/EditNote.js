import React, { useState, useEffect } from 'react';
import './editNote.css';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import firebase from '../../../firebase/firebase';
import Sidebar from '../../../components/sidebar/Sidebar';

function EditNote() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { noteId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNote = async () => {
      const noteRef = doc(firebase.database, 'notes', noteId);
      const noteSnapshot = await getDoc(noteRef);
      if (noteSnapshot.exists()) {
        const noteData = noteSnapshot.data();
        setTitle(noteData.title);
        setContent(noteData.content);
      } else {
        console.log('No such document!');
      }
    };

    fetchNote();
  }, [noteId]);

  const handleCancel = () => {
    navigate('/app/notes');
  }

  const handleSave = async () => {
    const noteRef = doc(firebase.database, 'notes', noteId);
    await updateDoc(noteRef, { title, content });
    navigate('/app/notes');
  };

  return (
    <div className='editNote'>
      <Sidebar />
      <div className='editNote-container'>
        <h1>Edit Note</h1>
        <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
        />
        <button className="cancel-button" onClick={handleCancel}>Cancel</button>
        <button className='save-button' onClick={handleSave}>Save</button>
      </div>
    </div>
  );
}

export default EditNote;
