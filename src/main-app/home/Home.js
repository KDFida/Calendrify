import React, { useEffect, useState } from "react";
import './home.css';
import Sidebar from "../../components/sidebar/Sidebar";
import firebase from "../../firebase/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { toast } from "react-toastify";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import '@fullcalendar/daygrid';
import TimeWidget from "./time/TimeWidget";
import QuoteWidget from "./quotes/QuoteWidget";

function filterTasksByPriority(tasks, priority) {
    return tasks.filter(task => task.priority === priority);
}

function filterTasksForToday(tasks) {
  const today = new Date().toISOString().split('T')[0];
  return tasks.filter(task => task.deadline === today);
}

function Home() {
    const [tasks, setTasks] = useState([]);
    const highPriorityTasks = filterTasksByPriority(tasks, 'high');
    const dueToday = filterTasksForToday(tasks);

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
        <div className="app-home-page">
          <Sidebar />
          <div className="app-home-page-container">
            <div className="home-calendar-view">
              <FullCalendar
                aspectRatio={2.8}
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                events={tasks}
                headerToolbar={{
                  left: 'prev,next,today',
                  center: 'title',
                  right: 'dayGridMonth,dayGridWeek,dayGridDay'
                }}
              />
            </div>

            <div className="task-summary-card">
                <h2>High Priority Tasks</h2>
                {highPriorityTasks.length > 0 ? (
                    <ul>
                    {highPriorityTasks.map(task => (
                        <li key={task.id}>
                        {task.name} - Due: {task.deadline}
                        </li>
                    ))}
                    </ul>
                ) : (
                    <p>No high priority tasks.</p>
                )}
            </div>

            <div className="tasks-due-today-card">
              <h2>Tasks Due Today</h2>
              {dueToday.length > 0 ? (
                <ul>
                  {dueToday.map(task => (
                    <li key={task.id}>
                      {task.name} - Due: {task.deadline}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No tasks due today.</p>
              )}
            </div>

            <TimeWidget />
            <QuoteWidget />
          </div>
        </div>
      );
      
}

export default Home