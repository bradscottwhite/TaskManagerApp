import React from 'react'
import Task from './Task'

/**
 * Displays tasks and delete button
 * @param {object} tasks
 * @param {method} taskToggle
 * @param {method} taskFilter
 * @param {method} taskUpdate
 * @returns {jsx}
 */
export default ({ tasks, taskToggle, taskFilter, taskUpdate }) => {
    return (
        <div className="bg-blue-300 p-10 items-center">
            <div className="block w-2/5 p-10 shadow-md bg-gray-300 mx-auto rounded-md items-center">
                <div className="flex flex-col items-center">
                    {tasks.map((task, i) => (
                        <Task
                            task={task}
                            taskToggle={taskToggle}
                            taskUpdate={taskUpdate}
                            index={i}
                        />
                    ))}
                </div>
                <button
                    className="bg-red-600 text-red-200 px-7 py-4 font-bold text-md rounded-xl shadow-lg
                               hover:bg-red-700 hover:text-red-100 hover:rounded-lg"
                    onClick={taskFilter}
                >
                    Clear completed
                </button>
            </div>
        </div>
    )
}