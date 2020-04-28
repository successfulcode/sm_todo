import { tasksAPI } from '../../api/api';
import _ from 'lodash';
//actions types
import {
    ADD_NEW_ITEM, DELTE_ITEM, ON_TOGGLE_IMPORTANT,
    ON_TOGGLE_DONE, ON_SEARCH_CHANGE, ON_FILTER_CHANGE,
    IS_LOADING, SET_TASKS, WRITE_TASK_IN_PROGRESS,
    DELETE_LOADING, IMPORTANT_LOADING,
    RESET_STATE, WRITE_ERROR,
    RESET_TASK_ERROR
} from './actionsTypes';

//Create item
const onTaskCreateHandler = (createItem) => ({ type: ADD_NEW_ITEM, createItem });

//Delte item
const onDeleteItemRx = (id) => ({ type: DELTE_ITEM, id });

//Delete function in progress, loading
const toggleDeleteTaskLoading = (taskId, loadingStatus) => ({
    type: DELETE_LOADING,
    taskId,
    loadingStatus
})

//Toggle important item
const onToggleImportantItemRx = (id, importantStatus) => ({ type: ON_TOGGLE_IMPORTANT, id, importantStatus });

//Important function in progress, loading
const importantLoading = (importantLoading, taskId) => ({
    type: IMPORTANT_LOADING,
    importantLoading,
    taskId
})

//Toggle done item
const onToggleDoneRx = (id, doneStatus) => ({ type: ON_TOGGLE_DONE, id, doneStatus });

//Toglee is fetching
const isLoading = (loading) => ({ type: IS_LOADING, loading })

//Set tasks from data
const setItems = (tasks) => ({ type: SET_TASKS, tasks })

//Add task in progress, loading
const writeTaskInProgress = (taskInProgress) => ({ type: WRITE_TASK_IN_PROGRESS, taskInProgress })

//Write error
const errorHandler = (error) => ({ type: WRITE_ERROR, error })

//Insert search text
export const onSearchChangeRx = (searchText) => ({ type: ON_SEARCH_CHANGE, searchText });

//Change fiter at the press of button
export const onFilterChangeRx = (filterName) => ({ type: ON_FILTER_CHANGE, filterName });

//Thunks
//Send new task
export const sendTask = (task, UIDD, TOKENN) => async (dispatch) => {
    try {
        //data fuction
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();
        today = `${yyyy}-${mm}-${dd}`;

        //new item object
        const newTask = {
            label: task,
            date: today,
            important: false,
            done: false
        }

        //post item to data
        dispatch(writeTaskInProgress(true));
        if (newTask.label) {
            let response = await tasksAPI.writeTask(newTask, UIDD, TOKENN);
            if (response.status === 200) {
                //add item to redux state
                dispatch(onTaskCreateHandler({ id: response.data.name, ...newTask }));
            };
        } else {
            alert('Nieko neįvedėte!')
        }
        dispatch(writeTaskInProgress(false))
    } catch (error) {
        dispatch(errorHandler('Kažkas atsitiko...' || error.message))
        dispatch(writeTaskInProgress(false))
    }
};

//Reset Error
export const resetError = () => ({ type: RESET_TASK_ERROR })

//Get tasks data
export const getTasksFromData = (UIDD, TOKENN) => {
    return async (dispatch) => {
        try {
            dispatch(isLoading(true));
            let response = await tasksAPI.getTask(UIDD, TOKENN);
            if (response.status === 200) {
                //Check do we have data
                if (response.data) {
                    const tasks = Object.entries(response.data).map(([id, item]) => _.chain(item).pick(['date', 'done', 'important', 'label']).merge({ id }).value());
                    const ascending = _.reverse(tasks)
                    dispatch(setItems(ascending));
                    dispatch(isLoading(false));
                } else {
                    dispatch(isLoading(false));
                }
            }
        }
        catch (error) {
            dispatch(errorHandler('Kažkas atsitiko...' || error.message))
            setTimeout(() => dispatch(isLoading(false)), 3000);
        }
    }
};

//On delete loading
export const onPushDeleteButton = (taskId, loadingStatus) => async (dispatch) => {
    dispatch(toggleDeleteTaskLoading(taskId, loadingStatus))
}

//Off delete loading
export const offPushDeleteButton = (taskId, loadingStatus) => async (dispatch) => {
    dispatch(toggleDeleteTaskLoading(taskId, loadingStatus = false))
}


//Delete item 
export const deleteTaskFromData = (taskId, UIDD, TOKENN) => async (dispatch) => {
    try {
        // dispatch(toggleDeleteTaskLoading(true, taskId))
        let response = await tasksAPI.deleteTask(taskId, UIDD, TOKENN);
        if (response.status === 200) {
            //delete item from redux state
            dispatch(onDeleteItemRx(taskId))
            dispatch(toggleDeleteTaskLoading(false, taskId))
        };
    } catch (error) {
        dispatch(toggleDeleteTaskLoading(taskId, false))
        dispatch(errorHandler('Kažkas atsitiko... Nepavyko ištrinti užduotį...' || error.message))
    }
};

//Change done status
export const changeDoneStatus = (taskId, doneStatus, UIDD, TOKENN) => async (dispatch) => {
    try {
        // done item from redux state
        dispatch(onToggleDoneRx(taskId, doneStatus, UIDD, TOKENN))
        let response = await tasksAPI.changeTaskDoneStatus(taskId, doneStatus, UIDD, TOKENN);
        if (response.status === 200) {
            // done item from redux state
        }
    } catch (error) {
        dispatch(errorHandler('Kažkas atsitiko... Nepavyko pažymėti įvykdytą užduotį...' || error.message))
    }
};

//Change important status
export const changeImportantStatus = (taskId, importantStatus, UIDD, TOKENN) => async (dispatch) => {
    try {
        dispatch(importantLoading(true, taskId))
        let response = await tasksAPI.changeTaskImportantStatus(taskId, importantStatus, UIDD, TOKENN);
        if (response.status === 200) {
            dispatch(onToggleImportantItemRx(taskId, importantStatus))
            dispatch(importantLoading(false, taskId))
        };
    } catch (error) {
        dispatch(errorHandler('Kažkas atsitiko... Nepavyko pakeisti užduoties statusą...' || error.message))
        dispatch(importantLoading(false, taskId))
    }
};

export const resetState = () => ({ type: RESET_STATE })
