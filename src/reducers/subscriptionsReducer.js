import * as types from '../actions/actionTypes';

const initialState = {
    subscriptions: {}
}

const subscriptionReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.ADD_SUBSCRIPTION:
            let addSubscription = structuredClone(state);
            addSubscription.subscriptions[action.payload.id] = action.payload;
            return addSubscription;
        case types.LOAD_SUBSCRIPTIONS:
            let loadSubscriptionsState = structuredClone(state);
            if (!action.payload) {
                return loadSubscriptionsState;
            }

            loadSubscriptionsState.subscriptions = action.payload;
            return loadSubscriptionsState;
        case types.DELETE_SUBSCRIPTION:
            let deleteSubscriptionState = structuredClone(state);
            delete deleteSubscriptionState.subscriptions[action.payload];
            return deleteSubscriptionState;
        default:
            return state;
    }
}

export default subscriptionReducer;