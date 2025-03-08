import * as types from './actionTypes';

export const loadBills = (payload) => {
    return {
        type: types.LOAD_BILLS,
        info: 'Loading bills.',
        payload
    }
}

export const addBill = (payload) => {
    return {
        type: types.ADD_BILL,
        info: 'Adding bill.',
        payload
    }
}

export const updateBill = (payload) => {
    return {
        type: types.UPDATE_BILL,
        info: 'Updating bill.',
        payload
    }
}

export const deleteBill = (payload) => {
    return {
        type: types.DELETE_BILL,
        info: 'Deleting bill.',
        payload
    }
}