import React, { useState, useEffect } from 'react';
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'

export default () =>  {
  const [ tasks, setTasks ] = useState([])

  /**
   * Fetchs data from rest api and puts it into the `tasks` state
   * @async
   * @returns {void}
   */
  const fetchTasks = async () => {
    const data = await fetch("http://localhost:8080/task/getAll")
    const json = await data.json()
    setTasks(json)
  }

  useEffect(() => { fetchTasks() }, [ tasks ])

  /**
   * Updates a task in the db to flip its checked property
   * @async
   * @param {object} task 
   * @returns {void}
   */
  const taskToggle = async task => 
    await fetch("http://localhost:8080/task/" + task.id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: task.id, task: task.task, checked: task.checked ? 0 : 1 })
    })

  /**
   * Filters thru tasks that are checked and deletes/removes them from the db and `tasks` state
   * @returns {void}
   */
  const taskFilter = () =>
    setTasks(
      tasks.filter((task, i) => {
        if (task.checked == 1) {
          /**
           * Deletes task from db
           * @async
           * @returns {void}
           */
          const delTask = async () => {
            fetch("http://localhost:8080/task/" + task.id, { method: "DELETE" })
            console.log(`Task ${task.id} deleted`)
          }
          delTask()
          return false

          //setTasks([ ...tasks ].filter((el, taskIndex) => taskIndex !== i))
          /*const newTasks = tasks.slice()
          newTasks.splice(i, 1)
          setTasks(newTasks)*/
        }
      })
    )
  
  /**
   * Updates task in db
   * @param {object} task
   * @param {string} newText 
   * @returns {void}
   */
  const taskUpdate = (task, newText) => {
    /**
     * @async
     * @returns {void}
     */
    const update = async () => {
      await fetch("http://localhost:8080/task/" + task.id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: task.id,
          task: newText,
          checked: task.checked
        })
      })
      console.log(`Task ${task.id} updated`)
    }
    update()
  }

  /**
   * Adds task to db
   * @param {object} task
   * @returns {void}
   */
  const addTask = task => {
    /**
     * @async
     * @returns {void}
     */
    const add = async () => {
      await fetch("http://localhost:8080/task/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          task, checked: 0
        })
      })
      console.log("New task added")
    }
    add()
  }

  return (
    <div className="App">
      <Header/>
      <Tasks
        tasks={tasks}
        taskToggle={taskToggle}
        taskFilter={taskFilter}
        taskUpdate={taskUpdate}
      />
      <AddTask addTask={addTask}/>
    </div>
  );
}