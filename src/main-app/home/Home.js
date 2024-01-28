import React, { useEffect, useState } from "react";
import './home.css';
import Sidebar from "../../components/sidebar/Sidebar";
import firebase from "../../firebase/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { toast } from "react-toastify";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import '@fullcalendar/daygrid';

function Home() {
    const [tasks, setTasks] = useState([]);

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
                aspectRatio={2.5}
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                events={tasks}
                headerToolbar={{
                  left: 'prev,next today',
                  center: 'title',
                  right: 'dayGridMonth,dayGridWeek,dayGridDay'
                }}
              />
            </div>
          </div>
        </div>
      );
      
}

export default Home