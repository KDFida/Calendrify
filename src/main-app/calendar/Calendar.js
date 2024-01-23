import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import './calendar.css';
import '@fullcalendar/daygrid';
import Sidebar from "../../components/sidebar/Sidebar";
import { AiFillPlusCircle } from "react-icons/ai";
import AddTaskDialog from "./add-task/AddTaskDialog";
import firebase from "../../firebase/firebase";
import { collection, query, where, getDocs } from "@firebase/firestore";
import { toast } from "react-toastify";

function Calendar() {
    const [tasks, setTasks] = useState([]);
    const [isDialogOpen, setDialogOpen] = useState(false);

    const handleAddTask = () => {
      setDialogOpen(true);
    };
  
    const handleCloseDialog = () => {
      setDialogOpen(false);
    };

    useEffect(() => {
        const unsubscribe = firebase.authentication.onAuthStateChanged(user => {
          if (user) {
            fetchTasks(user.uid); 
          } else {
            toast.info("Please log in to see the page");
            setTasks([]); 
          }
        });
   
        return () => unsubscribe();
      }, []); 

      function fetchTasks(userId) {
        const { database } = firebase;
        getDocs(query(collection(database, "tasks"), where("userId", "==", userId)))
          .then((querySnapshot) => {
            const tasksArray = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              title: doc.data().name,
              start: doc.data().deadline,
              ...doc.data()
            }));
            setTasks(tasksArray);
          })
          .catch(error => {
            toast.error("Error fetching tasks");
          });
      }   

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
                        events={tasks}
                        dayMaxEventRows={true}
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