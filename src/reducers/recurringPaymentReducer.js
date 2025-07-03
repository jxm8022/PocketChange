import * as types from '../actions/actionTypes';

const initialState = {
    bills: {},
    subscriptions: {}
}

const recurringPaymentReducer = (state = initialState, action) => {
    switch (action.type) {
        /* BILLS */
        case types.ADD_BILL:
            let addBill = structuredClone(state);
            addBill.bills[action.payload.id] = action.payload;
            return addBill;
        case types.LOAD_BILLS:
            let loadBillsState = structuredClone(state);
            if (!action.payload) {
                return loadBillsState;
            }

            loadBillsState.bills = action.payload;
            return loadBillsState;
        case types.DELETE_BILL:
            let deleteBillState = structuredClone(state);
            delete deleteBillState.bills[action.payload];
            return deleteBillState;
        /* SUBSCRIPTIONS */
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
        case types.LOGOUT:
            return initialState;
        default:
            return state;
    }
}

export default recurringPaymentReducer;