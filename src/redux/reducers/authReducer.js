import {
    AUTH_SUCCESS,
    AUTH_LOGOUT,
    TOGGLE_AUTH_LOADING,
    WRITE_AUTH_ERROR,
    RESET_AUTH_ERROR
} from '../actions/actionsTypes';

const initialState = {
    token: null,
    authIsLoading: false,
    authError: null
}
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_SUCCESS:
            return {
                ...state, token: action.token
            }
        case AUTH_LOGOUT:
            return {
                ...state, token: null
            }
        case TOGGLE_AUTH_LOADING:
            return {
                ...state, authIsLoading: action.toggle
            }
        case WRITE_AUTH_ERROR:
            return {
                ...state, authError: action.error
            }
        case RESET_AUTH_ERROR:
            return {
                ...state, authError: null
            }

        default:
            return state
    }
}

export default authReducer;