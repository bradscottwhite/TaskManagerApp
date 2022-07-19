import React, { useState } from 'react'

export default ({ task, taskToggle, taskFilter}) => {
    const [ edit, setEdit ] = useState(false)
    const [ text, setText ] = useState(task.task)

    const taskUpdate = newText => {
        fetch("http://localhost:8080/task/" + task.id, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: task.id,
                task: newText,
                checked: task.checked
            })
        })
            .then(() => {
                console.log(`Task ${task.id} updated`)
                setEdit(!edit)
                setText(newText)
            })
    }

    return (
        <div
            id={task.id}
            key={task.id + task.task}
            className="task"
        >
            {task.id}
            <input
                type="checkbox"
                checked={task.checked}
                onClick={e => taskToggle(task)}
            />
            <span
                className={task.checked ? "strike" : ""}
                onClick={e => setEdit(true)}
            >
                {!edit ?
                    text :
                    <input
                        value={text}
                        onChange={e => setText(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' ? taskUpdate(e.target.value) : 0}
                    />}
            </span>
        </div>
    )
};