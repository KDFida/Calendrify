import React, { useState } from 'react';
import { addDoc, collection } from '@firebase/firestore';
import { getAuth } from '@firebase/auth';
import firebase from '../../../firebase/firebase';
import { toast } from 'react-toastify';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField'; 
import './availabilityDialog.css';

function AvailabilityDialog({ open, onClose }) {
    const [availability, setAvailability] = useState({
        monday: { start: null, end: null },
        tuesday: { start: null, end: null },
        wednesday: { start: null, end: null },
        thursday: { start: null, end: null },
        friday: { start: null, end: null },
        saturday: { start: null, end: null },
        sunday: { start: null, end: null },
    });

    const handleTimeChange = (day, key, time) => {
        setAvailability(prev => ({
          ...prev,
          [day]: {
            ...prev[day],
            [key]: time
          }
        }));
    };

    const handleSave = async () => {
        const auth = getAuth();
        const user = auth.currentUser;
      
        if (user) {
          try {
            await addDoc(collection(firebase.database, "availability"), {
              userId: user.uid,
              availability: availability
            });
            toast.success("Availability added successfully!");
            onClose();  
          } catch (error) {
            toast.error("Error adding availability");
          }
        } else {
          toast.error("You must be logged in to set availability!");
        }
    };      

    return (
    <Dialog open={open} onClose={onClose} className="AvailabilityDialog">
        <DialogTitle>Set Availability</DialogTitle>
        <DialogContent>
            <div className="day-container">
                <TextField
                    label="Monday Start Time"
                    type="time"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      step: 300,
                    }}
                    value={availability.monday.start}
                    onChange={(e) => handleTimeChange('monday', 'start', e.target.value)}
                />
                <TextField
                    label="Monday End Time"
                    type="time"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      step: 300,
                    }}
                    value={availability.monday.end}
                    onChange={(e) => handleTimeChange('monday', 'end', e.target.value)}
                />
            </div>

            <div className="day-container">
                <TextField
                    label="Tuesday Start Time"
                    type="time"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      step: 300,
                    }}
                    value={availability.tuesday.start}
                    onChange={(e) => handleTimeChange('tuesday', 'start', e.target.value)}
                />
                <TextField
                    label="Tuesday End Time"
                    type="time"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      step: 300,
                    }}
                    value={availability.tuesday.end}
                    onChange={(e) => handleTimeChange('tuesday', 'end', e.target.value)}
                />
            </div>

            <div className="day-container">
                <TextField
                    label="Wednesday Start Time"
                    type="time"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      step: 300,
                    }}
                    value={availability.wednesday.start}
                    onChange={(e) => handleTimeChange('wednesday', 'start', e.target.value)}
                />
                <TextField
                    label="Wednesday End Time"
                    type="time"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      step: 300,
                    }}
                    value={availability.wednesday.end}
                    onChange={(e) => handleTimeChange('wednesday', 'end', e.target.value)}
                />
            </div>

            <div className="day-container">
                <TextField
                    label="Thursday Start Time"
                    type="time"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      step: 300,
                    }}
                    value={availability.thursday.start}
                    onChange={(e) => handleTimeChange('thursday', 'start', e.target.value)}
                />
                <TextField
                    label="Thursday End Time"
                    type="time"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      step: 300,
                    }}
                    value={availability.thursday.end}
                    onChange={(e) => handleTimeChange('thursday', 'end', e.target.value)}
                />
            </div>

            <div className="day-container">
                <TextField
                    label="Friday Start Time"
                    type="time"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      step: 300,
                    }}
                    value={availability.friday.start}
                    onChange={(e) => handleTimeChange('friday', 'start', e.target.value)}
                />
                <TextField
                    label="Friday End Time"
                    type="time"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      step: 300,
                    }}
                    value={availability.friday.end}
                    onChange={(e) => handleTimeChange('friday', 'end', e.target.value)}
                />
            </div>

            <div className="day-container">
                <TextField
                    label="Saturday Start Time"
                    type="time"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      step: 300,
                    }}
                    value={availability.saturday.start}
                    onChange={(e) => handleTimeChange('saturday', 'start', e.target.value)}
                />
                <TextField
                    label="Saturday End Time"
                    type="time"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      step: 300,
                    }}
                    value={availability.saturday.end}
                    onChange={(e) => handleTimeChange('saturday', 'end', e.target.value)}
                />
            </div>

            <div className="day-container">
                <TextField
                    label="Sunday Start Time"
                    type="time"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      step: 300,
                    }}
                    value={availability.sunday.start}
                    onChange={(e) => handleTimeChange('sunday', 'start', e.target.value)}
                />
                <TextField
                    label="Sunday End Time"
                    type="time"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      step: 300,
                    }}
                    value={availability.sunday.end}
                    onChange={(e) => handleTimeChange('sunday', 'end', e.target.value)}
                />
            </div>
        </DialogContent>
        <DialogActions className="DialogActions">
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
        </DialogActions>
    </Dialog>
    );
}

export default AvailabilityDialog;
