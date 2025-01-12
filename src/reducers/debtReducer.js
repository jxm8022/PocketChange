import * as types from '../actions/actionTypes';
import { TYPES } from '../resources/constants';
import { sortTransactionsByDateDesc } from '../utilities/ReducerHelper';

const initialState = {
    debts: [],
    debtSummary: {},
}

const debtReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.ADD_DEBT:
            return {
                ...state,
                debts: [
                    ...state.debts,
                    action.payload
                ].sort(sortTransactionsByDateDesc),
            };
        case types.DELETE_DEBT:
            let updatedDebts = [...state.debts].filter((transaction) => transaction.id !== action.payload);
            return {
                ...state,
                debts: updatedDebts.sort(sortTransactionsByDateDesc)
            };
        case types.LOAD_DEBT:
            let data = action.payload;

            let loadedDebts = [...initialState.debts];
            for (const id in data) {
                loadedDebts = [
                    ...loadedDebts,
                    {
                        id: id,
                        type: data[id].type,
                        name: data[id].name,
                        date: data[id].date,
                        amount: data[id].amount,
                    }
                ];
            }
            
            return {
                ...state,
                debts: loadedDebts.sort(sortTransactionsByDateDesc),
            };
        case types.CALCULATE_DEBT_SUMMARY:
            // CALCULATE TOTAL DEBT
            let summaryDictionary = {};
            for (let debt of state.debts) {
                if (debt.name in summaryDictionary) {
                    let previousDate = summaryDictionary[debt.name].date;
                    summaryDictionary = {
                        ...summaryDictionary,
                        [debt.name]: {
                            amount: summaryDictionary[debt.name].amount + debt.amount,
                            date: debt.date < previousDate ? debt.date : previousDate
                        }
                    };
                } else {
                    summaryDictionary = {...summaryDictionary, [debt.name]: {amount: debt.amount, date: debt.date}};
                }
            }

            // CALCULATE TOTAL DEBT PAYMENTS
            let allTransactions = action.payload;
            let debtPaymentDictionary = {};
            for (const year in allTransactions) {
                for (const month in allTransactions[year]) {
                    for (const id in allTransactions[year][month]) {
                        const debtPayment = allTransactions[year][month][id];
                        if (debtPayment.type === TYPES.DEBTPAYMENT && debtPayment.date > summaryDictionary[debtPayment.name]?.date) {
                            if (debtPayment.name in debtPaymentDictionary) {
                                debtPaymentDictionary = {...debtPaymentDictionary, [debtPayment.name]: debtPaymentDictionary[debtPayment.name] + debtPayment.amount};
                            } else {
                                debtPaymentDictionary = {...debtPaymentDictionary, [debtPayment.name]: debtPayment.amount};
                            }
                        }
                    }
                }
            }

            // UPDATE CALCULATED DEBT
            for (const debt in summaryDictionary) {
                if (debt in debtPaymentDictionary) {
                    summaryDictionary = {
                        ...summaryDictionary,
                        [debt]: {
                            ...summaryDictionary[debt],
                            amount: summaryDictionary[debt].amount - debtPaymentDictionary[debt]
                        }
                    };
                }
            }

            let calculatedSummary = Object.keys(summaryDictionary).map((key) => {return {name: key, amount: summaryDictionary[key].amount}});
            return {
                ...state,
                debtSummary: calculatedSummary,
            };
        case types.DELETE_ALL_TRANSACTIONS:
            return {
                ...state,
                debts: initialState.debts,
                debtSummary: initialState.debtSummary,
            }
        default:
            return state;
    }
}

export default debtReducer;