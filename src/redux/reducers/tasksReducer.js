//actions types
import {
    ADD_NEW_ITEM, DELTE_ITEM, ON_TOGGLE_IMPORTANT,
    ON_TOGGLE_DONE, ON_SEARCH_CHANGE, ON_FILTER_CHANGE,
    IS_LOADING, SET_TASKS, WRITE_TASK_IN_PROGRESS,
    DELETE_LOADING, IMPORTANT_LOADING,
    RESET_STATE, WRITE_ERROR, RESET_TASK_ERROR
} from '../actions/actionsTypes';

const initialState = {
    items: [],
    filterRx: 'all',
    search: '',
    filterButtonsRx: [
        { name: 'all', label: 'Viskas' },
        { name: 'active', label: 'Neatlikta' },
        { name: 'important', label: 'Svarbios' },
        { name: 'done', label: 'Atlikta' }
    ],
    loading: false,
    error: null,
    taskInProgress: false,
    deleteLoading: [],
    importantLoading: []
};

const updateObjectInArray = (items, itemId, objPropName, newObjProps) => {
    return items.map(st => {
        if (st[objPropName] === itemId) {
            return { ...st, ...newObjProps }
        };
        return st;
    })
};


const tasksReducer = (state = initialState, action) => {

    const { items } = state

    switch (action.type) {
        case ADD_NEW_ITEM:
            return {
                ...state, items: [action.createItem, ...state.items]
            }
        case DELTE_ITEM:
            return {
                ...state,
                items: state.items.filter(p => p.id !== action.id)
            }
        case ON_TOGGLE_IMPORTANT:

            return {
                ...state,
                items: updateObjectInArray(items, action.id, 'id', { important: action.importantStatus })
            }
        case IMPORTANT_LOADING:
            return {
                ...state,
                importantLoading: action.importantLoading
                    ? [...state.importantLoading, action.taskId]
                    : state.importantLoading.filter(id => id !== action.taskId)
            }
        case ON_TOGGLE_DONE:
            return {
                ...state,
                items: updateObjectInArray(items, action.id, 'id', { done: action.doneStatus })
            }
        case ON_SEARCH_CHANGE:
            return {
                ...state,
                search: action.searchText
            }
        case ON_FILTER_CHANGE:
            return {
                ...state,
                filterRx: action.filterName
            }
        case IS_LOADING: {
            return { ...state, loading: action.loading }
        }
        case SET_TASKS: {
            return { ...state, items: action.tasks }
        }
        case WRITE_TASK_IN_PROGRESS:
            return { ...state, taskInProgress: action.taskInProgress }
        case DELETE_LOADING:
            return {
                ...state,
                deleteLoading: action.loadingStatus
                    ? [...state.deleteLoading, action.taskId]
                    : state.deleteLoading.filter(id => id !== action.taskId)
            }
        case RESET_STATE:
            return {
                ...state, items: null
            }
        case WRITE_ERROR:
            return {
                ...state, error: action.error
            }
        case RESET_TASK_ERROR:
            return {
                ...state, error: null, items: null
            }
        default:
            return state
    }
};

export default tasksReducer;
