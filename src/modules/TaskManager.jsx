const url = "https://fecapstone-eliot.firebaseio.com/tasks"

export default {
  getOneTask(taskId) {
    return fetch(`${url}/${taskId}.json`).then(res => res.json())
  },
  getAll() {
    return fetch(`${url}.json`)
      .then(res => res.json())
      .then(firebaseObj => {
        if (firebaseObj) {
          let actualData = Object.keys(firebaseObj).map(id => {
            firebaseObj[id].id = id
            return firebaseObj
          })
          return actualData
        } else {
          let tasks = []
          return tasks
        }
      })
  },
  addTask(taskObj) {
    return fetch(`${url}.json`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(taskObj)
    }).then(res => res.json())
  },
  patchTask(editedTask, taskId) {
    return fetch(`${url}/${taskId}.json`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editedTask)
    }).then(res => res.json())
  },
  deleteTask(taskId) {
    return fetch(`${url}/${taskId}.json`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json())
  }
}

