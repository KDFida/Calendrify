import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import './calendar.css';
import '@fullcalendar/daygrid';
import Sidebar from "../../components/sidebar/Sidebar";
import { AiFillPlusCircle } from "react-icons/ai";
import AddTaskDialog from "../components/add-task/AddTaskDialog";
import AvailabilityDialog from "./availability/AvailabilityDialog";
import ManageTasksDialog from "../components/manage-task/ManageTasksDialog";
import firebase from "../../firebase/firebase";
import { collection, query, where, getDocs, doc, deleteDoc } from "@firebase/firestore";
import { toast } from "react-toastify";

function Calendar() {
    const [tasks, setTasks] = useState([]);
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [isAvailabilityDialogOpen, setAvailabilityDialogOpen] = useState(false);
    const [isManageDialogOpen, setManageDialogOpen] = useState(false);

    const handleAddTask = () => {
      setDialogOpen(true);
    };
  
    const handleCloseDialog = () => {
      setDialogOpen(false);
    };

    const handleAddAvailability = () => {
        setAvailabilityDialogOpen(true);
    };

    const handleCloseAddAvailability = () => {
        setAvailabilityDialogOpen(false);
    };

    const handleManageTasks = () => {
      setManageDialogOpen(true);
    };
  
    const handleCloseManageDialog = () => {
      setManageDialogOpen(false);
    };
        
    const handleDeleteTask = async (taskId) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            const { database } = firebase;
            const taskRef = doc(database, "tasks", taskId);
            
            try {
                await deleteDoc(taskRef);
                toast.success("Task deleted successfully");
                setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
            } catch (error) {
                toast.error(`Error deleting task: ${error.message}`);
            }
        }
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
                        <button className="availabilityButton" onClick={handleAddAvailability}>Set Availability</button>
                        <button className="regenerateButton">New timetable</button>
                        <button className="manageTasksButton" onClick={handleManageTasks}>
                            Manage Tasks
                        </button>
                        <button className="addTaskButton" onClick={handleAddTask}>                        
                            <AiFillPlusCircle size={40} color="#09043d" />
                        </button>
                    </div>
                </div>

                <div className="calendar-view">
                    <FullCalendar
                        aspectRatio={2.0}
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
            <ManageTasksDialog
                    open={isManageDialogOpen}
                    onClose={handleCloseManageDialog}
                    tasks={tasks}
                    onDelete={handleDeleteTask}
              />
            <AvailabilityDialog open={isAvailabilityDialogOpen} onClose={handleCloseAddAvailability} />
        </div>
    )
}

export default Calendar;