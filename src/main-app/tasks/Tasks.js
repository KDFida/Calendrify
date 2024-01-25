import React, { useState, useEffect } from "react";
import './tasks.css';
import Sidebar from "../../components/sidebar/Sidebar";
import { AiFillPlusCircle } from "react-icons/ai";
import AddTaskDialog from "../components/add-task/AddTaskDialog";
import firebase from "../../firebase/firebase";
import { toast } from "react-toastify";
import { getDocs, query, collection, where } from "@firebase/firestore";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import '@fullcalendar/daygrid';

function Tasks() {
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [tasks, setTasks] = useState([]);

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
        <div className="tasks-page">
            <Sidebar />
            <div className="tasks-container">
                <div className="top-bar">
                    <p className="task-title">Tasks - Deadlines</p>
                    <div className="buttons">
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
                <AddTaskDialog open={isDialogOpen} onClose={handleCloseDialog}/>
            </div>
        </div>
    )
}

export default Tasks;