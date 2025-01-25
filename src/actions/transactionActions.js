import * as types from './actionTypes';

export const addRecurringTransaction = (payload) => {
    return {
        type: types.ADD_RECURRING_TRANSACTION,
        info: 'Add recurring transaction',
        payload
    }
}

export const deleteRecurringTransaction = (payload) => {
    return {
        type: types.DELETE_RECURRING_TRANSACTION,
        info: 'Delete recurring transaction',
        payload
    }
}

export const loadRecurringTransactions = (payload) => {
    return {
        type: types.LOAD_RECURRING_TRANSACTIONS,
        info: 'Load reacurring transactions',
        payload
    }
}

export const addTransaction = (payload) => {
    return {
        type: types.ADD_TRANSACTION,
        info: 'Add transaction to specified month.',
        payload
    }
}

export const updateTransaction = (payload) => {
    return {
        type: types.UPDATE_TRANSACTION,
        info: 'Update transaction information.',
        payload
    }
}

export const deleteTransaction = (payload) => {
    return {
        type: types.DELETE_TRANSACTION,
        info: 'Delete transaction information.',
        payload
    }
}

export const loadTransactions = (payload) => {
    return {
        type: types.LOAD_TRANSACTIONS,
        info: 'Loading transactions for specified year.',
        payload
    }
}

export const addDictionaryItem = (payload) => {
    return {
        type: types.ADD_DICTIONARY_ITEM,
        info: 'Adding dictionary item.',
        payload
    }
}

export const loadDictionary = (payload) => {
    return {
        type: types.LOAD_DICTIONARY,
        info: 'Loading dictionary.',
        payload
    }
}

export const setDate = (payload) => {
    return {
        type: types.SET_DATE,
        info: 'Setting date to specified date',
        payload
    }
}

export const deleteAllTransactions = (payload) => {
    return {
        type: types.DELETE_ALL_TRANSACTIONS,
        info: 'Delete all transactions'
    }
}

export const filterTransactions = (payload) => {
    return {
        type: types.FILTER_TRANSACTIONS,
        info: 'Filter transactions',
        payload
    }
}