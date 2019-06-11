const url = "http://localhost:8088/tasks"

export default {
  getOneTask(taskId) {
    return fetch(`${url}/${taskId}`).then(res => res.json())
  },
  getAll() {
    return fetch(`${url}`).then(res => res.json())
  },
  addTask(taskObj) {
    return fetch(`${url}`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(taskObj)
    }).then(res => res.json())
  },
  patchTask(editedTask) {
    return fetch(`${url}/${editedTask.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editedTask)
    }).then(res => res.json());
  }
}

