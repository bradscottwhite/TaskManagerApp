import React, { useState, useEffect } from 'react';
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import { getTasks, addTask, toggleTask, updateTask, delTask } from './services/taskServices'

export default () =>  {
  const [ tasks, setTasks ] = useState([])

  // This will only run when component mounts:
  // !!! NOTE: Because of this it will not update if another user changes the db unless it is reloaded !!!
  useEffect(() => { getTasks(setTasks) }, [])

  /**
   * Updates a task's complete property in the db and local copy
   * @param {object} task - task to make complete
   * @param {number} i - index of task
   * @param {method} setComplete - method to make local copy complete
   * @returns {void}
   */
  const handleToggle = (task, i, setComplete) => {
    // Update the task checked value in the db:
    toggleTask(task)
    // Set the local copy and value:
    var tasksCopy = [ ...tasks ]
    tasksCopy.splice(i, 1, { id: task.id, task: task.task, checked: task.checked ? 0 : 1 })
    setTasks(tasksCopy)
    setComplete(task.checked ? 0 : 1)
  }

  /**
   * Updates a task in the db and local copy
   * @param {object} task - task to be updated
   * @param {string} newText - text to be replace the existing text
   * @param {number} i - index of task to be updated
   * @returns {void}
   */
  const handleUpdate = (task, newText, i) => {
    updateTask(task, newText)
    const tasksCopy = [ ...tasks ]
    tasksCopy.splice(i, 1, { id: task.id, task: newText, checked: task.checked })
    setTasks(tasksCopy)
  }


  /**
   * Filters thru tasks that are checked and deletes/removes them from the db and `tasks` state
   * @returns {void}
   */

  ///!!!!! Need to fix function here !!!!!!
  const taskFilter = () =>
    tasks.map((task, i) => {
      if (task.checked === 1) {
        delTask(task.id)
        const tasksCopy = tasks.slice()
        tasksCopy.splice(i, 1)
        setTasks(tasksCopy)
      }
    })

  return (
    <div className="App">
      <Header/>
      <Tasks
        tasks={tasks}
        handleToggle={handleToggle}
        taskFilter={taskFilter}
        handleUpdate={handleUpdate}
      />
      <AddTask
        tasks={tasks}
        setTasks={setTasks}
        addTask={addTask}
      />
    </div>
  )
}