import React, { useState, useEffect } from "react";
import './tasks.css';
import Sidebar from "../../components/sidebar/Sidebar";
import { AiFillPlusCircle } from "react-icons/ai";
import AddTaskDialog from "../components/add-task/AddTaskDialog";
import firebase from "../../firebase/firebase";
import { toast } from "react-toastify";
import { getDocs, query, collection, where, deleteDoc, doc } from "@firebase/firestore";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import '@fullcalendar/daygrid';
import ManageTasksDialog from "../components/manage-task/ManageTasksDialog";

function Tasks() {
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [isManageDialogOpen, setManageDialogOpen] = useState(false);

    const handleManageTasks = () => {
    setManageDialogOpen(true);
    };

    const handleCloseManageDialog = () => {
    setManageDialogOpen(false);
    };

    const handleAddTask = () => {
        setDialogOpen(true);
    };
    
    const handleCloseDialog = () => {
    setDialogOpen(false);
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
    });

    function fetchTasks(userId) {
        const { database } = firebase;
        getDocs(query(collection(database, "tasks"), where("userId", "==", userId)))
          .then((querySnapshot) => {
            const tasksArray = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              title: doc.data().name,
              start: doc.data().deadline,
              ...doc.data()
            }))
            .filter(task => task.status !== 'finished');
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
                        <button className="manageTasksButton" onClick={handleManageTasks} data-testid="manageTasksButton">
                            Manage Tasks
                        </button>
                        <button className="addTaskButton" onClick={handleAddTask} data-testid="addTaskButton">                       
                            <AiFillPlusCircle size={40} color="#09043d" />
                        </button>
                    </div>
                </div>
                <div className="calendar-view" data-testid="fullCalendar">
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
                <AddTaskDialog open={isDialogOpen} onClose={handleCloseDialog}/>
                <ManageTasksDialog
                    open={isManageDialogOpen}
                    onClose={handleCloseManageDialog}
                    tasks={tasks}
                    onDelete={handleDeleteTask}
                />
            </div>
        </div>
    )
}

export default Tasks;