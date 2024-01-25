import React, { useState } from "react";
import './tasks.css';
import Sidebar from "../../components/sidebar/Sidebar";
import { AiFillPlusCircle } from "react-icons/ai";
import AddTaskDialog from "../components/add-task/AddTaskDialog";

function Tasks() {
    const [isDialogOpen, setDialogOpen] = useState(false);

    const handleAddTask = () => {
        setDialogOpen(true);
      };
    
      const handleCloseDialog = () => {
        setDialogOpen(false);
      };

    return (
        <div className="tasks-page">
            <Sidebar />
            <div className="tasks-container">
                <div className="top-bar">
                    <p className="task-title">Tasks</p>
                    <div className="buttons">
                        <button className="addTaskButton" onClick={handleAddTask}>                        
                            <AiFillPlusCircle size={40} color="#09043d" />
                        </button>
                    </div>
                </div>
                <AddTaskDialog open={isDialogOpen} onClose={handleCloseDialog}/>
            </div>
        </div>
    )
}

export default Tasks;