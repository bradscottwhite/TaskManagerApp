import React, { useState, useEffect } from 'react';
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'

function App() {
  const [ tasks, setTasks ] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch("http://localhost:8080/task/getAll")
      const json = await data.json()
      setTasks(json)
    }
    fetchData()
  }, [ tasks ])

  const taskToggle = async task => 
    await fetch("http://localhost:8080/task/" + task.id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: task.id, task: task.task, checked: task.checked ? 0 : 1 })
    })

  const taskFilter = () => //{
    setTasks(
      tasks.filter((task, i) => {
        if (task.checked == 1) {
          const delTask = async () => {
            fetch("http://localhost:8080/task/" + task.id, { method: "DELETE" })
            console.log(`Task ${task.id} deleted`)
          }
          delTask()
          return false
          //setTasks(tasks.filter((el, taskIndex) => taskIndex !== i))
          /*const newTasks = tasks.slice()
          newTasks.splice(i, 1)
          setTasks(newTasks)*/
        }
      })
    )
    //setTasks()
  //}
    
  const taskUpdate = (task, newText) => {
    const update = async () => {
      await fetch("http://localhost:8080/task/" + task.id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: task.id,
          task: newText,
          checked: task.checked})
      })
      console.log(`Task ${task.id} updated`)
    }
    update()
  }

  const addTask = task => {
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

export default App;
