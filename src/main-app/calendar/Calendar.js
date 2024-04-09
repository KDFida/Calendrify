import React, { useState, useEffect, useCallback } from "react";
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
import { collection, query, where, getDocs, addDoc, updateDoc, doc, deleteDoc } from "@firebase/firestore";
import { toast } from "react-toastify";
import { generateSchedule } from "./schedule/GenerateSchedule";
import ActualHoursDialog from "../components/actual-hours/ActualHoursDialog";

function Calendar() {
    const [tasks, setTasks] = useState([]);
    const [availability, setAvailability] = useState({});
    const [preference, setPreference] = useState('priority');
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [isAvailabilityDialogOpen, setAvailabilityDialogOpen] = useState(false);
    const [scheduleId, setScheduleId] = useState(null);
    const [calendarEvents, setCalendarEvents] = useState(null);
    const [Filteredtasks, setFilteredTasks] = useState([]);
    const [isManageDialogOpen, setManageDialogOpen] = useState(false);
    const [isActualHoursDialogOpen, setIsActualHoursDialogOpen] = useState(false);

    const handleOpenActualHoursChange = () => {
      setIsActualHoursDialogOpen(true);
    };
  
    const handleCloseActualHoursChange = () => {
      setIsActualHoursDialogOpen(false);
    };
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

    const handlePreferenceChange = (newPreference) => {
      setPreference(newPreference);
      handleNewTimetable();
    };

    const handleNewTimetable = useCallback(async () => {
      const newSchedule = generateSchedule(tasks, availability, preference);
  
      try {
          const { database } = firebase;
          const user = firebase.authentication.currentUser;
          if (user) {
              if (scheduleId) {
                  const scheduleRef = doc(database, "schedules", scheduleId);
                  await updateDoc(scheduleRef, { schedule: newSchedule });
              } else {
                  await addDoc(collection(database, "schedules"), {
                      userId: user.uid,
                      schedule: newSchedule
                  });
              }
              toast.success("Schedule saved successfully");
          }
      } catch (error) {
          toast.error("Error saving schedule: " + error.message);
      }
    }, [tasks, availability, preference, scheduleId]);

    // useEffect(() => {
    //   handleNewTimetable();
    // }, [handleNewTimetable]);

    useEffect(() => {
        const unsubscribe = firebase.authentication.onAuthStateChanged(user => {
          if (user) {
            fetchTasks(user.uid); 
            fetchAvailability(user.uid);
            fetchSchedule(user.uid);
          } else {
            toast.info("Please log in to see the page");
            setTasks([]); 
            setAvailability({});
          }
        });
   
        return () => unsubscribe();
    }); 

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
          }));

          const tasksNeedingActualHours = tasksArray.filter(task => 
            (task.status === 'finished' || task.deadline < today) && (task.actualHours === null || task.actualHours === '')
          );
          if (tasksNeedingActualHours.length > 0) {
              setFilteredTasks(tasksNeedingActualHours);
          } else {
              setFilteredTasks([]);
          }

          if (tasksArray.length === 0) {
            setTasks([]);
          } else {
            setTasks(tasksArray.filter(task => task.status !== 'finished' && task.deadline >= today));
          }
        })
        .catch(error => {
          toast.error("Error fetching tasks");
        });
    }   

    function fetchAvailability(userId) {
      const { database } = firebase;
      getDocs(query(collection(database, "availability"), where("userId", "==", userId)))
          .then((querySnapshot) => {
              if (!querySnapshot.empty) {
                  const userAvailability = querySnapshot.docs[0].data().availability;
                  setAvailability(userAvailability);
              } else {
                  toast.info("No availability set yet");
              }
          })
          .catch(error => {
              toast.error("Error fetching availability");
          });
    }

    function fetchSchedule(userId) {
      const { database } = firebase;
      getDocs(query(collection(database, "schedules"), where("userId", "==", userId)))
        .then((querySnapshot) => {
          if (!querySnapshot.empty) {
            const scheduleDoc = querySnapshot.docs[0].data().schedule;
            const events = [];
    
            Object.keys(scheduleDoc).forEach(fullDateString => {
              const dateTasks = scheduleDoc[fullDateString];
              dateTasks.forEach(task => {
                const date = new Date(fullDateString);
                const formattedDate = toFullCalendarDateString(date);
                events.push({
                  title: task.name,
                  start: formattedDate
                });
              });
            });
            
            setCalendarEvents(events);
            setScheduleId(querySnapshot.docs[0].id);
          } else {
            toast.info("No schedule yet");
          }
        })
        .catch(error => {
          toast.error("Error fetching schedule: " + error.message);
        });
    }
      
    function toFullCalendarDateString(date) {
      const pad = (number) => number.toString().padStart(2, '0');
      return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
    }
      
    return (
        <div className="calendar">
            <Sidebar />
            <div className="calendar-container">
                <div className="top-bar">
                    <p className="calendar-title">Calendar</p>
                    <div className="buttons">
                        <select className="select-style" value={preference} onChange={(e) => handlePreferenceChange(e.target.value)} data-testid="dropdown-menu">
                          <option value="priority">Priority</option>
                          <option value="deadline">Deadline</option>
                        </select>
                        <button className="actualHoursButton" onClick={handleOpenActualHoursChange}>
                          Actual Hours
                        </button>
                        <button className="availabilityButton" onClick={handleAddAvailability} data-testid="availabilityButton">Set Availability</button>
                        <button className="regenerateButton" onClick={handleNewTimetable} data-testid="regenerateButton">New timetable</button>
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
                        events={calendarEvents}
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
            <ActualHoursDialog
                open={isActualHoursDialogOpen}
                onClose={handleCloseActualHoursChange}
                tasks={Filteredtasks}
            />
        </div>
    )
}

export default Calendar;