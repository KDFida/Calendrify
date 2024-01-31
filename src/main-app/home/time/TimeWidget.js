import React, { useState, useEffect } from "react";
import './timeWidget.css';

function TimeWidget() {
    const [currentTime, setCurrentTime] = useState(new Date());
  
    useEffect(() => {
      const timerId = setInterval(() => {
        setCurrentTime(new Date());
      }, 1000);
  
      return () => clearInterval(timerId);
    }, []);
  
    return (
      <div className="time-widget">
        <h2>Current Time</h2>
        <p>{currentTime.toLocaleTimeString()}</p>
      </div>
    );
}

export default TimeWidget;