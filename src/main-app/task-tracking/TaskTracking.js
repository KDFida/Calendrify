import React, { useState, useEffect } from "react";
import './taskTracking.css';
import Sidebar from "../../components/sidebar/Sidebar";
import firebase from "../../firebase/firebase";
import { getDocs, collection, query, where, doc, deleteDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import ManageTasksDialog from "../components/manage-task/ManageTasksDialog";

function changeStatus(status) {
    if (status === "notStarted") {
        return "not started"
    } else if (status === "inProgress") {
        return "in progress"
    } else if (status === "today") {
        return "due today"
    }
}

function TaskTracking() {
    const [inProgressTasks, setInProgressTasks] = useState([]);
    const [notStartedTasks, setNotStartedTasks] = useState([]);
    const [todayTasks, setTodayTasks] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [isManageDialogOpen, setManageDialogOpen] = useState(false);

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
            toast.info("Please log in to see the tasks");
            setInProgressTasks([]);
            setNotStartedTasks([]);
            setTodayTasks([]); 
            setTasks([]);
          }
        });
        return () => unsubscribe();
    }, []);

    function fetchTasks(userId) {
        const { database } = firebase;
        const today = new Date().toISOString().split('T')[0];
        getDocs(query(collection(database, "tasks"), where("userId", "==", userId)))
          .then((querySnapshot) => {
            const tasksArray = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                title: doc.data().name,
                start: doc.data().deadline,
                ...doc.data()
            })).filter(task => task.status !== 'finished' && task.deadline >= today);
            const inProgress = tasksArray.filter(task => task.status === 'inProgress');
            const notStarted = tasksArray.filter(task => task.status === 'notStarted');
            const dueToday = tasksArray.filter(task => task.deadline === today);
            if (tasksArray.length === 0) {
                setTasks([]);
            } else {
                setTasks(tasksArray);
                setInProgressTasks(inProgress);
                setNotStartedTasks(notStarted);
                setTodayTasks(dueToday);
            }
          })
          .catch(error => {
            toast.error("Error fetching tasks: " + error.message);
          });
    }

    const renderTasks = (tasks, status) => {
        const statusUser = changeStatus(status);
        if (tasks.length === 0) {
            return <div className="no-tasks-message">No tasks {statusUser}.</div>;
        }
        return tasks.map((task, index) => (
            <div key={index} className="task-item">
                <span className="tasks-title">{task.name}</span>
                <span className="task-remaining">{" - " + task.estimatedHours} estimated hours</span>
            </div>
        ));
    };

    return (
        <div className="task-tracking">
            <Sidebar />
            <div className="titleAndButton">
                <h1 className="taskTracking-title">Task Tracking</h1>
            <div className="buttons">
                <button className="manageTasksButtonTracking" onClick={handleManageTasks}>
                    Manage Tasks
                </button>
            </div>
            </div>
            <div className="task-tracking-container">
                <div className="task-sections">
                    <section className="task-section in-progress-tasks">
                        <h2>Task Tracking - In Progress</h2>
                        {renderTasks(inProgressTasks, 'inProgress')}
                    </section>
                    <section className="task-section not-started-tasks">
                        <h2>Task Tracking - Not Started</h2>
                        {renderTasks(notStartedTasks, 'notStarted')}
                    </section>
                </div>
                <section className="today-tasks">
                    <h2>Task Tracking - Today</h2>
                    {renderTasks(todayTasks, 'today')}
                </section>
            </div>

            <ManageTasksDialog
                    open={isManageDialogOpen}
                    onClose={handleCloseManageDialog}
                    tasks={tasks}
                    onDelete={handleDeleteTask}
            />
        </div>
    )
}

export default TaskTracking;