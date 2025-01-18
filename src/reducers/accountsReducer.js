import * as types from '../actions/actionTypes';
import { transactionCategories } from '../resources/labels';

const initialState = {
    accounts: {},
    accountDictionary: {},
}

const getTransactionType = (typeId) => transactionCategories[typeId].type;

const getTransactionTotal = (accountTypeId, transactions) => {
    let total = 0;

    if (!transactions) {
        return total;
    }

    for (const year in transactions) {
        for (const month in transactions[year]) {
            for (const transactionId in transactions[year][month]) {
                const transaction = transactions[year][month][transactionId];
                if (accountTypeId === 2 || accountTypeId === 'Credit') // Credit Cards
                {
                    switch (transaction.type) {
                        case 3:
                        case 'Debt Payment':
                            total -= transaction.amount;
                            break;
                        default:
                            total += transaction.amount;
                            break;
                    }
                }
                else {
                    switch (transaction.type) {
                        case 4:
                        case 'Income':
                            total += transaction.amount;
                            break;
                        default:
                            total -= transaction.amount;
                            break;
                    }
                }
            }
        }
    }

    return total;
}

/* handle sorting */
const accountsReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.ADD_ACCOUNT:
            let addAccountState = structuredClone(state);
            addAccountState.accounts[action.payload.id] = action.payload;
            addAccountState.accountDictionary[action.payload.id] = action.payload.name;
            return addAccountState;
        case types.UPDATE_ACCOUNT:
            let updateAccountState = structuredClone(state);
            updateAccountState.accounts[action.payload.accountId].currentBalance = action.payload.currentBalance;
            return updateAccountState;
        case types.LOAD_ACCOUNTS:
            let loadAccountsState = structuredClone(state);
            if (!action.payload) {
                return loadAccountsState;
            }

            loadAccountsState.accounts = action.payload;
            loadAccountsState.accountDictionary = Object.keys(action.payload).reduce((acc, key) => {
                acc[key] = action.payload[key].name;
                return acc;
            }, {});

            return loadAccountsState;
        case types.ADD_TRANSACTION:
            const newTransaction = {
                ...action.payload,
                type: getTransactionType(action.payload.type)
            }
            const targetYear = action.payload.date.substring(0, 4);
            const targetMonth = action.payload.date.substring(5, 7);

            let updatedAccounts = structuredClone(state.accounts);
            const accountIndex = updatedAccounts.findIndex(account => account.id === newTransaction.accountId);

            if (!updatedAccounts[accountIndex].transactions) {
                updatedAccounts[accountIndex].transactions = {};
            }

            if (!updatedAccounts[accountIndex].transactions[targetYear]) {
                updatedAccounts[accountIndex].transactions[targetYear] = {};
            }

            if (!updatedAccounts[accountIndex].transactions[targetYear][targetMonth]) {
                updatedAccounts[accountIndex].transactions[targetYear][targetMonth] = {};
            }

            updatedAccounts[accountIndex].transactions[targetYear][targetMonth][newTransaction.id] = newTransaction;

            updatedAccounts[accountIndex].displayBalance = updatedAccounts[accountIndex].balance + getTransactionTotal(updatedAccounts[accountIndex].type, updatedAccounts[accountIndex].transactions);

            return {
                ...state,
                accounts: updatedAccounts,
            };
        case types.DELETE_ALL_TRANSACTIONS:
            return initialState
        case types.LOGOUT:
            return initialState;
        default:
            return state;
    }
}

export default accountsReducer;