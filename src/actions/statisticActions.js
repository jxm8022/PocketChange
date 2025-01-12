import * as types from './actionTypes';

export const loadStatistics = (payload) => {
    return {
        type: types.LOAD_STATISTICS,
        info: 'Load statistics',
        payload
    }
}

export const saveAllTransactions = (payload) => {
    return {
        type: types.SAVE_ALL_TRANSACTIONS,
        info: 'Saving all transactions',
        payload
    }
}

export const calculateStatistics = () => {
    return {
        type: types.CALCULATE_STATISTICS,
        info: 'Calculating statistics'
    }
}