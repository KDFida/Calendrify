import React from "react";
import './calendar.css';
import Sidebar from "../../components/sidebar/Sidebar";
import { AiFillPlusCircle } from "react-icons/ai";

function Calendar() {
    return (
        <div className="calendar">
            <Sidebar />
            <div className="top-bar">
                <p className="title">Calendar</p>
                <div className="buttons">
                    <button className="availabilityButton">Set Availability</button>
                    <button className="regenerateButton">New timetable</button>
                    <button className="addTaskButton">                        
                        <AiFillPlusCircle size={40} color="#09043d" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Calendar;