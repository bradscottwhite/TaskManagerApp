import React, { useState } from 'react'

export default ({ addTask }) => {
    const [ task, setTask ] = useState('')

    const handleSubmit = e => {
        addTask(task)
        setTask('')
    }

    return (
        <footer>
            <input
                value={task}
                onChange={e => setTask(e.currentTarget.value)}
                placeholder="Enter task..."
            />
            <button onClick={handleSubmit}>Add Task</button>
        </footer>
    )
}