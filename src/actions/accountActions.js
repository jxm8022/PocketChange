import * as types from './actionTypes';

export const addAccount = (payload) => {
    return {
        type: types.ADD_ACCOUNT,
        info: 'Adding account.',
        payload
    }
}

export const updateAccount = (payload) => {
    return {
        type: types.UPDATE_ACCOUNT,
        info: 'Updating account.',
        payload
    }
}

export const loadAccounts = (payload) => {
    return {
        type: types.LOAD_ACCOUNTS,
        info: 'Loading accounts.',
        payload
    }
}