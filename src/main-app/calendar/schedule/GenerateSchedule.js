export function generateSchedule(tasks, availability, preference) {
    let unfinishedTasks = filterActiveTasks(tasks);
    let sortedTasks = sortTasks(unfinishedTasks, preference);
    let lastDeadline = getLastTaskDeadline(sortedTasks);
    let schedule = {};
    let currentDate = new Date();

    while (currentDate <= lastDeadline) {
        const dayOfWeek = currentDate.toLocaleString('en-us', { weekday: 'long' }).toLowerCase();
        if (availability[dayOfWeek] && availability[dayOfWeek].start !== null && availability[dayOfWeek].end !== null) {
            const availableHours = calculateHours(availability[dayOfWeek]);
            const allocations = allocateTasksToAvailableSlots(sortedTasks, availableHours);

            schedule[currentDate] = allocations.daySchedule;
            sortedTasks = allocations.unallocatedTasks;
        }

        if (sortedTasks.length === 0) {
            break;
        }

        currentDate.setDate(currentDate.getDate() + 1);
    }

    return schedule;
}

// Get the last deadline in the tasks
function getLastTaskDeadline(tasks) {
    return new Date(Math.max(...tasks.map(task => new Date(task.deadline).getTime())));
}

//Only keep tasks not marked as 'finished' and tasks that are in the future
function filterActiveTasks(tasks) {
    const currentDate = new Date();
    
    return tasks.filter(task => {
        const taskDeadline = new Date(task.deadline);
        return task.status !== 'finished' && taskDeadline >= currentDate;
    });
}

//Sort tasks by user preference
function sortTasks(tasks, sortBy) {
    if (sortBy === 'priority') {
        const priorityOrder = { 'high': 1, 'medium': 2, 'low': 3 };
        return tasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    } else if (sortBy === 'deadline') {
        return tasks.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
    } else {
        return tasks;
    }
}

//Calculate the hours a user is available on a specific day 
function calculateHours(availability) {
    if (availability.start && availability.end) {
        const [startHour, startMinute] = availability.start.split(':').map(Number);
        const [endHour, endMinute] = availability.end.split(':').map(Number);
        const totalHours = (endHour + (endMinute / 60)) - (startHour + (startMinute / 60));
        return totalHours;
    }
    return 0;
}

//Allocate tasks to available slots
function allocateTasksToAvailableSlots(sortedTasks, availableHours) {
    let daySchedule = [];
    let remainingHours = availableHours;

    // Create a deep copy of sortedTasks to avoid mutating the input array
    let remainingTaskHours = JSON.parse(JSON.stringify(sortedTasks));

    for (let i = 0; i < remainingTaskHours.length; i++) {
        let task = remainingTaskHours[i];

        if (task.estimatedHours <= remainingHours) {
            daySchedule.push({ ...task, allocatedHours: task.estimatedHours });
            remainingHours -= task.estimatedHours;
            task.estimatedHours = 0; // Task is completed on this day
        } else if (remainingHours > 0) {
            daySchedule.push({ ...task, allocatedHours: remainingHours });
            task.estimatedHours -= remainingHours; // Subtract the allocated hours from the task's estimated hours
            remainingHours = 0; // No more hours available on this day
        }

        // If no more hours are available on this day, break out of the loop
        if (remainingHours === 0) {
            break;
        }
    }

    // Filter out the tasks that are completely allocated (estimatedHours are 0)
    let unallocatedTasks = remainingTaskHours.filter(task => task.estimatedHours > 0);

    return { daySchedule, unallocatedTasks };
}

