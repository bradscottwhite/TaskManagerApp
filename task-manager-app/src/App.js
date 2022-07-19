import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'

function App() {
  const [ tasks, setTasks ] = useState([])

  useEffect(() => {
    fetch("http://localhost:8080/task/getAll")
      .then(res => res.json())
      .then(res => { return setTasks(res) })
  }, [ tasks ])

  const taskToggle = task => 
    fetch("http://localhost:8080/task/" + task.id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: task.id, task: task.task, checked: task.checked ? 0 : 1 })
    })

  const taskFilter = () =>
    tasks.map(task => {
      if (task.checked == 1)
        fetch("http://localhost:8080/task/" + task.id, {
          method: "DELETE"
        })
          .then(() => {
            console.log(`Task ${task.id} deleted`)
          })
    })

  const addTask = task => {
    fetch("http://localhost:8080/task/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        task, checked: 0
      })
    })
      .then(() => {
        console.log("New task added")
      })
  }

  return (
    <div className="App">
      <Header/>
      <Tasks
        tasks={tasks}
        taskToggle={taskToggle}
        taskFilter={taskFilter}
      />
      <AddTask addTask={addTask}/>
    </div>
  );
}

export default App;