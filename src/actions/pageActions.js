import * as types from './actionTypes';

export const setMessage = (payload) => {
    return {
        type: types.SET_MESSAGE,
        info: 'Setting notification message.',
        payload
    }
}