import axios from 'axios';
import {
    AUTH_SUCCESS, AUTH_LOGOUT, TOGGLE_AUTH_LOADING, WRITE_AUTH_ERROR, RESET_AUTH_ERROR
} from './actionsTypes';

//Login and sign up function
export const auth = (email, password, isLogin) => {
    return async dispatch => {
        try {
            const authData = {
                email, password, returnSecureToken: true
            }
            let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA6kv0lGhbmPY06jYSd1CEooHUq_lZKB7U'

            if (isLogin) {
                url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA6kv0lGhbmPY06jYSd1CEooHUq_lZKB7U'
            }

            dispatch(toggleAuthLoading(true))
            const response = await axios.post(url, authData)

            const data = response.data

            const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000)

            localStorage.setItem('token', data.idToken)
            localStorage.setItem('UID', data.localId)
            localStorage.setItem('expirationDate', expirationDate)

            dispatch(authSuccess(data.idToken))
            dispatch(autoLogut(data.expiresIn))
            dispatch(toggleAuthLoading(false))
        } catch (error) {
            dispatch(errorAuthHandler('Kažkas atsitiko ne taip... Patikrinikite įvestus duomenys ir bandykite iš naujo!' || error.message))
            dispatch(toggleAuthLoading(false))
        }
    };
};

//Write auth error
const errorAuthHandler = (error) => ({ type: WRITE_AUTH_ERROR, error })

//Autologout time
export const autoLogut = (time) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, time * 1000)
    };
};

//Remove token, userId, expirationDate from loacalstorage
export const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('UID')
    localStorage.removeItem('expirationDate')
    localStorage.clear()
    return {
        type: AUTH_LOGOUT,
    };
};

//Toggle loading for preloaders
const toggleAuthLoading = (toggle) => ({ type: TOGGLE_AUTH_LOADING, toggle });

//Get token
const authSuccess = (token) => ({ type: AUTH_SUCCESS, token });

//Auto login function
export const autoLogin = () => {
    return dispatch => {
        const token = localStorage.getItem('token')
        if (!token) {
            dispatch(logout())
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'))
            if (expirationDate <= new Date()) {
                dispatch(logout())
            } else {
                dispatch(authSuccess(token))
                dispatch(autoLogut((expirationDate.getTime() - new Date().getTime()) / 1000))
            }
        }
    };
};

export const resetAuthError = () => ({ type: RESET_AUTH_ERROR })