import { configureStore } from '@reduxjs/toolkit';
import pageReducer from '../reducers/pageReducer';
import transactionReducer from '../reducers/transactionReducer';
import userReducer from '../reducers/userReducer';
import statisticReducer from '../reducers/statisticReducer';
import debtReducer from '../reducers/debtReducer';
import accountsReducer from '../reducers/accountsReducer';
import recurringPaymentReducer from '../reducers/recurringPaymentReducer';

const store = configureStore(
    {
        reducer: {
            page: pageReducer,
            statistics: statisticReducer,
            debt: debtReducer,
            transaction: transactionReducer,
            user: userReducer,
            accounts: accountsReducer,
            recurringPayments: recurringPaymentReducer,
        }
    }
);

export default store;