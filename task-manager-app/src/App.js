import React, { useState, useEffect } from 'react';
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import { getTasks, addTask, toggleTask, updateTask, delTask } from './services/taskServices'

export default () =>  {
  const [ tasks, setTasks ] = useState([])

  useEffect(() => { getTasks(setTasks) }, [ tasks ])

  /**
   * Filters thru tasks that are checked and deletes/removes them from the db and `tasks` state
   * @returns {void}
   */
  const taskFilter = () =>
    setTasks(
      tasks.filter((task, i) => {
        if (task.checked == 1) {
          delTask(task.id)
          return false

          //setTasks([ ...tasks ].filter((el, taskIndex) => taskIndex !== i))
          /*const newTasks = tasks.slice()
          newTasks.splice(i, 1)
          setTasks(newTasks)*/
        }
      })
    )

  return (
    <div className="App">
      <Header/>
      <Tasks
        tasks={tasks}
        toggleTask={toggleTask}
        taskFilter={taskFilter}
        updateTask={updateTask}
      />
      <AddTask addTask={addTask}/>
    </div>
  );
}