import * as types from './actionTypes';

export const addDebt = (payload) => {
    return {
        type: types.ADD_DEBT,
        info: 'Adding debt.',
        payload
    }
}

export const deleteDebt = (payload) => {
    return {
        type: types.DELETE_DEBT,
        info: 'Deleting debt.',
        payload
    }
}

export const loadDebt = (payload) => {
    return {
        type: types.LOAD_DEBT,
        info: 'Loading debt.',
        payload
    }
}

export const calculateDebtSummary = (payload) => {
    return {
        type: types.CALCULATE_DEBT_SUMMARY,
        info: 'Calculating debt summary.',
        payload
    }
}