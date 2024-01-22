import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import './calendar.css';
import '@fullcalendar/daygrid';
import Sidebar from "../../components/sidebar/Sidebar";
import { AiFillPlusCircle } from "react-icons/ai";
import AddTaskDialog from "./add-task/AddTaskDialog";

function Calendar() {
    const [isDialogOpen, setDialogOpen] = useState(false);

    const handleAddTask = () => {
      setDialogOpen(true);
    };
  
    const handleCloseDialog = () => {
      setDialogOpen(false);
    };

    return (
        <div className="calendar">
            <Sidebar />
            <div className="calendar-container">
                <div className="top-bar">
                    <p className="calendar-title">Calendar</p>
                    <div className="buttons">
                        <button className="availabilityButton">Set Availability</button>
                        <button className="regenerateButton">New timetable</button>
                        <button className="addTaskButton" onClick={handleAddTask}>                        
                            <AiFillPlusCircle size={40} color="#09043d" />
                        </button>
                    </div>
                </div>

                <div className="calendar-view">
                    <FullCalendar
                        aspectRatio={2.7}
                        plugins={[dayGridPlugin]}
                        initialView="dayGridMonth"
                        weekends={true}
                        headerToolbar={{
                            left: 'prev,next,today',
                            center: 'title',
                            right: 'dayGridMonth,dayGridWeek,dayGridDay'
                        }}
                    />
                </div>
            </div>
            <AddTaskDialog open={isDialogOpen} onClose={handleCloseDialog}/>
        </div>
    )
}

export default Calendar;