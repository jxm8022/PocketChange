import * as types from './actionTypes';

export const loadUser = () => {
    return {
        type: types.LOAD_USER,
        info: 'Loading user information.'
    }
}

export const login = (payload) => {
    return {
        type: types.LOGIN,
        info: 'Logging in user.',
        payload
    }
}

export const logout = () => {
    return {
        type: types.LOGOUT,
        info: 'Logging out user.'
    }
}