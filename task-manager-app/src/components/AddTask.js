import React, { useState } from 'react'

/**
 * Displays form to add task
 * @param {method} addTask
 * @returns {jsx}
 */
export default ({ addTask }) => {
    const [ task, setTask ] = useState('')

    /**
     * Calls method to add task and resets form
     * @param {object} e
     * @returns {void}
     */
    const handleSubmit = e => {
        addTask(task)
        setTask('')
    }

    return (
        <footer className="bg-blue-500 w-screen items-center py-6 pb-10">
            <div className="block shadow-md bg-gray-200 mx-auto rounded-md p-5 w-2/5 items-center">
                <input
                    className="form-control block w-full px-3 py-1.5 bg-clip-padding border border-solid border-gray-300
                                rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    value={task}
                    onChange={e => setTask(e.currentTarget.value)}
                    placeholder="Enter task..."
                />
                <button
                    className="bg-green-600 text-green-200 px-10 py-4 font-bold text-md rounded-xl shadow-lg
                            hover:bg-green-700 hover:text-green-100 hover:rounded-lg mt-3"
                    onClick={handleSubmit}
                >
                    Add Task
                </button>
            </div>
        </footer>
    )
}