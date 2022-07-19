import React from 'react'
import Task from './Task'

export default ({ tasks, taskToggle, taskFilter }) => {
    return (
        <div>
            {tasks.map(task => (
                <Task
                    task={task}
                    taskToggle={taskToggle}
                    taskFilter={taskFilter}
                />
            ))}
            <button onClick={taskFilter}>Clear completed</button>
        </div>
    )
}