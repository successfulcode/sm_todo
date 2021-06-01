import * as axios from "axios";

const instance = axios.create({
//    baseURL : process.env.REACT_APP_BASE_URL
   baseURL : `https://sm-todo-app.firebaseio.com/myTodo`
})

export const tasksAPI = {
    writeTask(task, UIDD, TOKENN) {
        return instance.post(`${UIDD}.json?auth=${TOKENN}`, task)
    },
    getTask(UIDD, TOKENN) {
        return instance.get(`${UIDD}.json?auth=${TOKENN}`)
    },
    deleteTask(taskId, UIDD, TOKENN) {
        return instance.delete(`${UIDD}/${taskId}.json?auth=${TOKENN}`)
    },
    changeTaskDoneStatus(taskId, doneStatus, UIDD, TOKENN) {
        return instance.patch(`${UIDD}/${taskId}.json?auth=${TOKENN}`, { done: doneStatus })
    },
    changeTaskImportantStatus(taskId, importantStatus, UIDD, TOKENN) {
        return instance.patch(`${UIDD}/${taskId}.json?auth=${TOKENN}`, { important: importantStatus })
    }
}
