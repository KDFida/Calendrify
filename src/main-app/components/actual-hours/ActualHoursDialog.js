import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { updateDoc, doc } from 'firebase/firestore';
import firebase from '../../../firebase/firebase';
import { toast } from 'react-toastify';

function ActualHoursDialog({ open, onClose, tasks }) {
  const [taskUpdates, setTaskUpdates] = useState([]);

  useEffect(() => {
    if (open) {
      const tasksToUpdate = tasks.filter(task => 
        (new Date(task.deadline) < new Date() || task.status === 'finished') && (task.actualHours == null)
      ).map(task => ({
        ...task,
        actualHoursInput: ''
      }));
      setTaskUpdates(tasksToUpdate);
    }
  }, [open, tasks]);

  const handleActualHoursChange = (index, value) => {
    const updatedTasks = [...taskUpdates];
    updatedTasks[index].actualHoursInput = value;
    setTaskUpdates(updatedTasks);
  };

  const handleSave = async () => {
    try {
      for (const task of taskUpdates) {
        const taskRef = doc(firebase.database, "tasks", task.id);
        await updateDoc(taskRef, { actualHours: task.actualHoursInput });
      }
      toast.success("Hours added!");
      onClose();
    } catch (error) {
      toast.error("Error updating tasks!");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Update Actual Hours Spent</DialogTitle>
      <DialogContent>
        {taskUpdates.map((task, index) => (
          <div key={task.id} style={{ marginBottom: '10px' }}>
            <div>{task.title}</div>
            <TextField
              fullWidth
              label="Actual Hours"
              type="number"
              value={task.actualHoursInput}
              onChange={(e) => handleActualHoursChange(index, e.target.value)}
            />
          </div>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ActualHoursDialog;