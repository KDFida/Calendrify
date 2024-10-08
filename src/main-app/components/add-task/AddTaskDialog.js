import React, { useState } from 'react';
import { toast } from 'react-toastify';
import firebase from '../../../firebase/firebase';
import { addDoc, collection } from '@firebase/firestore';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import axios from 'axios';

function AddTaskDialog({ open, onClose }) {
  const [taskName, setTaskName] = useState('');
  const [taskPriority, setPriority] = useState('');
  const [taskStatus, setStatus] = useState('');
  const [estimatedHours, setEstimatedHours] = useState('');
  const [taskDeadline, setDeadline] = useState('');
  const [error, setError] = useState('');

  const handleSave = () => {
    if (!taskName || !taskPriority || isNaN(estimatedHours) || !taskDeadline) {
      setError('Please fill in all fields.');
      return;
    }

    setError('');

    const { database } = firebase;
    const user = firebase.authentication.currentUser;
    
    if (user) {
        try {
            addDoc(collection(database, "tasks"), {
                name: taskName,
                priority: taskPriority,
                status: taskStatus,
                estimatedHours: parseFloat(estimatedHours),
                deadline: taskDeadline,
                userId: user.uid,
                actualHours: null
            });
            toast.success("Task added successfully!");
            onClose(); 
            window.location.reload();
        } catch (e) {
            toast.error("Error adding task");
        }
    } else {
        toast.error("You must be logged in to add a task!");
    }
    onClose(); 
  };

  const handleGetRecommendedHours = async () => {
      if (!estimatedHours || !taskPriority) {
          toast.error("Please enter estimated hours and select a priority to get recommendations.");
          return;
      }
      
      try {
          const response = await axios.post('http://localhost:5000/predict', {
              estimatedHours: parseInt(estimatedHours),
              priority: taskPriority
          });
          
          if (response.data) {
              alert(`Based on similar tasks, we recommend setting the actual hours to ${response.data.predictedHours}.`);
          } else {
              toast.error("Failed to get recommendations. Please try again.");
          }
      } catch (error) {
          toast.error("Error fetching recommended hours. Please check your network and try again.");
      }
  };  

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Task</DialogTitle>
      <DialogContent>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <TextField
          autoFocus
          margin="dense"
          label="Task Name"
          type="text"
          fullWidth
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <FormControl fullWidth margin="normal">
            <InputLabel id="priority-label">Priority</InputLabel>
            <Select
                labelId="priority-label"
                value={taskPriority}
                onChange={(e) => setPriority(e.target.value)}
                label="Priority"
            >
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">High</MenuItem>
            </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
            <InputLabel id="status-label">Status</InputLabel>
            <Select
                labelId="status-label"
                value={taskStatus}
                onChange={(e) => setStatus(e.target.value)}
                label="Not Started"
            >
                <MenuItem value="notStarted">Not Started</MenuItem>
                <MenuItem value="inProgress">In Progress</MenuItem>
                <MenuItem value="finished">Finished</MenuItem>
            </Select>
        </FormControl>

        <TextField
          margin="dense"
          label="Deadline"
          type="date"
          fullWidth
          value={taskDeadline}
          onChange={(e) => setDeadline(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />

        <TextField
          margin="dense"
          label="Estimated Hours to Complete"
          type="number"
          fullWidth
          value={estimatedHours}
          onChange={(e) => setEstimatedHours(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            min: 0,
            max: 100,
            step: 0.5
          }}
        />
        <Button
          onClick={handleGetRecommendedHours}
          color="primary"
          style={{ marginTop: 8 }}
        >
          Get Recommended Hours
        </Button>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddTaskDialog;