// !!! Note: (delete later) consider switching to axios if fetch keeps not working !!!
// Base rest api url:
const url = 'http://localhost:8080/task/'

/**
 * Fetchs data from rest api and puts it into the `tasks` state
 * @async
 * @param {method} setTasks - sets `tasks` state
 * @returns {void}
 */
const getTasks = async setTasks => {
  const data = await fetch(url + 'getAll')
  const json = await data.json()
  setTasks(json)
}

/**
 * Adds task to db
 * @async
 * @param {object} task - task to add
 * @returns {void}
 */
const addTask = async task => {
  await fetch(url + "add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      task, checked: 0
    })
  })
  console.log("New task added")
}

/**
 * Updates a task in the db to flip its checked property
 * @async
 * @param {object} task 
 * @returns {void}
 */
const toggleTask = async task => 
  await fetch(url + task.id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: task.id, task: task.task, checked: task.checked ? 0 : 1 })
  })

/**
 * Updates task in db
 * @async
 * @param {object} task - task to be updated
 * @param {string} newText - text to be replace the existing text
 * @returns {void}
 */
const updateTask = async (task, newText) => {
  await fetch(url + task.id, {
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

/**
 * Deletes task from db
 * @async
 * @param {number} id - id of task to delete
 * @returns {void}
 */
const delTask = async (id) => {
  await fetch(url + id, { method: "DELETE" })
  console.log(`Task ${id} deleted`)
}

// Exporting functions:
export { getTasks, addTask, toggleTask, updateTask, delTask }