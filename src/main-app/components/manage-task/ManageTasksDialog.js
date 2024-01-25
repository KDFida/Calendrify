import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { DialogContent } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';

function ManageTasksDialog({ open, onClose, tasks, onEdit, onDelete }) {
  const [selectedTask, setSelectedTask] = useState(null);
  const [status, setStatus] = useState('');
  const [deadline, setDeadline] = useState('');

  const openEditDialog = (task) => {
    setSelectedTask(task);
    setStatus(task.status);
    setDeadline(task.deadline);
  };

  const handleEdit = () => {
    if (selectedTask) {
      onEdit(selectedTask.id, { status, deadline });
    }
    setSelectedTask(null);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Manage Tasks</DialogTitle>
      <List>
        {tasks.map((task) => (
          <ListItem key={task.id} secondaryAction={
            <>
              <IconButton edge="end" aria-label="edit" onClick={() => openEditDialog(task)}>
                <EditIcon />
              </IconButton>
              <IconButton edge="end" aria-label="delete" onClick={() => onDelete(task.id)}>
                <DeleteIcon />
              </IconButton>
            </>
          }>
            <ListItemText primary={task.title} secondary={`Due: ${task.start}`} />
          </ListItem>
        ))}
      </List>
      {selectedTask && (
        <DialogContent>
          <Select
            label="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            fullWidth
          >
            <MenuItem value="notStarted">Not Started</MenuItem>
            <MenuItem value="inProgress">In Progress</MenuItem>
            <MenuItem value="finished">Finished</MenuItem>
          </Select>
          <TextField
            label="Deadline"
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        </DialogContent>
      )}
      <DialogActions>
        <Button onClick={() => setSelectedTask(null)}>Cancel</Button>
        <Button onClick={handleEdit}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ManageTasksDialog;