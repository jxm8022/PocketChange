import * as types from './actionTypes';

export const loadSubscriptions = (payload) => {
    return {
        type: types.LOAD_SUBSCRIPTIONS,
        info: 'Loading subscriptions.',
        payload
    }
}

export const addSubscription = (payload) => {
    return {
        type: types.ADD_SUBSCRIPTION,
        info: 'Adding subscription.',
        payload
    }
}

export const updateSubscription = (payload) => {
    return {
        type: types.UPDATE_SUBSCRIPTION,
        info: 'Updating subscription.',
        payload
    }
}

export const deleteSubscription = (payload) => {
    return {
        type: types.DELETE_SUBSCRIPTION,
        info: 'Deleting subscription.',
        payload
    }
}