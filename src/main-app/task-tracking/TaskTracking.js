import React, { useState, useEffect } from "react";
import './taskTracking.css';
import Sidebar from "../../components/sidebar/Sidebar";
import firebase from "../../firebase/firebase";
import { getDocs, collection, query, where } from "firebase/firestore";
import { toast } from "react-toastify";

function TaskTracking() {
    const [inProgressTasks, setInProgressTasks] = useState([]);
    const [notStartedTasks, setNotStartedTasks] = useState([]);
    const [todayTasks, setTodayTasks] = useState([]);

    useEffect(() => {
        const unsubscribe = firebase.authentication.onAuthStateChanged(user => {
          if (user) {
            fetchTasks(user.uid); 
          } else {
            toast.info("Please log in to see the tasks");
            setInProgressTasks([]);
            setNotStartedTasks([]);
            setTodayTasks([]); 
          }
        });
        return () => unsubscribe();
    }, []);

    function fetchTasks(userId) {
        const { database } = firebase;
        const today = new Date().toISOString().split('T')[0];
        getDocs(query(collection(database, "tasks"), where("userId", "==", userId)))
          .then((querySnapshot) => {
            const tasksArray = querySnapshot.docs.map(doc => doc.data());
            const inProgress = tasksArray.filter(task => task.status === 'inProgress');
            const notStarted = tasksArray.filter(task => task.status === 'notStarted');
            const dueToday = tasksArray.filter(task => task.deadline === today);

            setInProgressTasks(inProgress);
            setNotStartedTasks(notStarted);
            setTodayTasks(dueToday);
          })
          .catch(error => {
            toast.error("Error fetching tasks: " + error.message);
          });
    }

    const renderTasks = (tasks, status) => {
        if (tasks.length === 0) {
            return <div className="no-tasks-message">No tasks {status}.</div>;
        }
        return tasks.map((task, index) => (
            <div key={index} className="task-item">
                <span className="tasks-title">{task.name}</span>
                <span className="task-remaining">{task.estimatedHours} estimated hours</span>
            </div>
        ));
    };

    return (
        <div className="task-tracking">
            <Sidebar />
            <div className="title">
                <h1 className="taskTracking-title">Task Tracking</h1>
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
        </div>
    )
}

export default TaskTracking;