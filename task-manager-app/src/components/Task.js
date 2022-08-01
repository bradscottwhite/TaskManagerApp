import React, { useState } from 'react'

/**
 * Displays task with checkbox
 * @param {object} task
 * @param {method} handleToggle
 * @param {method} handleUpdate
 * @param {number} index
 * @returns {jsx}
 */
export default ({ task, handleToggle, handleUpdate, index }) => {
    const [ edit, setEdit ] = useState(false)
    const [ text, setText ] = useState(task.task)
    const [ complete, setComplete ] = useState(task.checked)

    /**
     * Checks if enter key is pressed and if so it updates task and resets it
     * @param {object} e
     * @returns {void}
     */
    const ifEnterPressed = e => {
        if (e.key === 'Enter') {
            handleUpdate(task, e.target.value, index)
            setEdit(!edit)
            setText(e.target.value)
        }
    }

    return (
        <div
            id={task.id}
            key={index}
            className="bg-gray-200 font-sans container rounded-lg shadow-lg mb-4 text-xl font-medium text-slate-700 py-4 px-8"
        >
            <span className="px-3">
                {task.id}
            </span>
            <input
                type="checkbox"
                checked={complete}
                onChange={e => handleToggle(task, index, setComplete)}
                className="form-check-input appearance-none h-4 w-4 border mt-1.5 border-gray-400 rounded-sm bg-gray-200 checked:bg-red-600 checked:border-red-700 focus:outline-none transition duration-200 my-1 align-top bg-no-repeat bg-center bg-contain cursor-pointer"
            />
            <label
                className={
                    "px-3 form-check-label inline-block text-gray-800 " +
                    (complete ? "line-through" : "")
                }
                onClick={e => setEdit(true)}
            >
                {!edit ?
                    text :
                    <input
                        className="form-control block w-full px-3 py-1.5 bg-clip-padding border border-solid border-gray-300
                                    rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        value={text}
                        onChange={e => setText(e.target.value)}
                        onKeyDown={e => ifEnterPressed(e)}
                    />}
            </label>
        </div>
    )
};