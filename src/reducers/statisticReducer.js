import * as types from '../actions/actionTypes';
import { categories } from '../resources/labels';
import { getOverview, sortByAmount, sortByTimes } from '../utilities/ReducerHelper';

const initialState = {
    statistics: {},
    lifetimeNet: 0,
    lifetimeTransactions: {},
    transactionDictionary: [],
    topVisited_amount: [],
    topVisited_times: [],
    activeYears: [],
}

const statisticReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.LOAD_STATISTICS:
            let loadStatisticsState = structuredClone(state);
            loadStatisticsState.statistics = action.payload ?? {};
            return loadStatisticsState;
        case types.ADD_TRANSACTION:
            let transactionToAdd = action.payload;
            let year = parseInt(action.payload.date.split('-')[0]);
            let month = action.payload.date.split('-')[1];
            let existingTransactions = { ...state.lifetimeTransactions };
            let updatedActiveYears = state.activeYears;
            if (existingTransactions[year]) {
                if (existingTransactions[year][month]) {
                    let updatedYear = { ...existingTransactions[year] };
                    let updatedMonth = { ...existingTransactions[year][month] };
                    updatedMonth = {
                        ...updatedMonth,
                        [transactionToAdd.id]: {
                            amount: transactionToAdd.amount,
                            date: transactionToAdd.date,
                            name: transactionToAdd.name,
                            type: transactionToAdd.type,
                            accountId: transactionToAdd.accountId,
                        }
                    };

                    updatedYear = {
                        ...updatedYear,
                        [month]: updatedMonth
                    };

                    existingTransactions = {
                        ...existingTransactions,
                        [year]: updatedYear
                    };
                } else if (existingTransactions[year]) {
                    existingTransactions[year] = {
                        ...existingTransactions[year],
                        [month]: {
                            [transactionToAdd.id]: {
                                amount: transactionToAdd.amount,
                                date: transactionToAdd.date,
                                name: transactionToAdd.name,
                                type: transactionToAdd.type,
                                accountId: transactionToAdd.accountId,
                            }
                        }
                    };
                }
            } else {
                existingTransactions = {
                    ...existingTransactions,
                    [year]: {
                        [month]: {
                            [transactionToAdd.id]: {
                                amount: transactionToAdd.amount,
                                date: transactionToAdd.date,
                                name: transactionToAdd.name,
                                type: transactionToAdd.type,
                                accountId: transactionToAdd.accountId,
                            }
                        }
                    }
                }
                updatedActiveYears = [Object.keys(existingTransactions)];
            }

            return {
                ...state,
                lifetimeTransactions: existingTransactions,
                activeYears: updatedActiveYears.sort(),
            };
        case types.UPDATE_TRANSACTION:
            let updatedTransactions = { ...state.lifetimeTransactions };
            // REMOVE TRANSACTION
            let old_Transaction = action.payload.prev;
            let old_Year = old_Transaction.date.split('-')[0];
            let old_Month = old_Transaction.date.split('-')[1];
            let old_updatedYearTransactions = { ...updatedTransactions[old_Year] };
            let newMonthTransactions;
            for (let transaction in updatedTransactions[old_Year][old_Month]) {
                if (transaction !== old_Transaction.id) {
                    newMonthTransactions = {
                        ...newMonthTransactions,
                        [transaction]: updatedTransactions[old_Year][old_Month][transaction],
                    }
                }
            }

            old_updatedYearTransactions = {
                ...old_updatedYearTransactions,
                [old_Month]: newMonthTransactions
            };

            updatedTransactions = {
                ...updatedTransactions,
                [old_Year]: old_updatedYearTransactions
            };
            // ADDING TRANSACTION
            let new_Transaction = action.payload.new;
            let new_Year = new_Transaction.date.split('-')[0];
            let new_Month = new_Transaction.date.split('-')[1];
            let new_updatedActiveYears = state.activeYears;
            if (updatedTransactions[new_Year]) {
                if (updatedTransactions[new_Year][new_Month]) {
                    let updatedYear = { ...updatedTransactions[new_Year] };
                    let updatedMonth = { ...updatedTransactions[new_Year][new_Month] };
                    updatedMonth = {
                        ...updatedMonth,
                        [new_Transaction.id]: {
                            amount: new_Transaction.amount,
                            date: new_Transaction.date,
                            name: new_Transaction.name,
                            type: new_Transaction.type,
                        }
                    };

                    updatedYear = {
                        ...updatedYear,
                        [new_Month]: updatedMonth
                    };

                    updatedTransactions = {
                        ...updatedTransactions,
                        [new_Year]: updatedYear
                    };
                } else if (updatedTransactions[new_Year]) {
                    updatedTransactions[new_Year] = {
                        ...updatedTransactions[new_Year],
                        [new_Month]: {
                            [new_Transaction.id]: {
                                amount: new_Transaction.amount,
                                date: new_Transaction.date,
                                name: new_Transaction.name,
                                type: new_Transaction.type,
                            }
                        }
                    };
                }
            } else {
                updatedTransactions = {
                    ...updatedTransactions,
                    [new_Year]: {
                        [new_Month]: {
                            [new_Transaction.id]: {
                                amount: new_Transaction.amount,
                                date: new_Transaction.date,
                                name: new_Transaction.name,
                                type: new_Transaction.type,
                            }
                        }
                    }
                }
                new_updatedActiveYears = Object.keys(updatedTransactions);
            }

            return {
                ...state,
                lifetimeTransactions: updatedTransactions,
                activeYears: new_updatedActiveYears,
            };
        case types.SAVE_ALL_TRANSACTIONS:
            const currentYear = new Date().getFullYear().toString();
            if (!action.payload) {
                let activeYears = [currentYear];
                localStorage.setItem('startYear', JSON.stringify(currentYear));
                localStorage.setItem('currentDisplayYear', currentYear);
                return {
                    ...state,
                    activeYears: activeYears,
                };
            }

            let combinedTransactions = {};
            for (let accountId in action.payload) {
                const accountTransactions = structuredClone(action.payload[accountId].transactions);
                if (accountTransactions) {
                    for (let y in accountTransactions) {
                        if (!combinedTransactions[y]) {
                            combinedTransactions[y] = {}
                        }

                        for (let m in accountTransactions[y]) {
                            if (!combinedTransactions[y][m]) {
                                combinedTransactions[y][m] = {}
                            }

                            for (let transactionId in accountTransactions[y][m]) {
                                accountTransactions[y][m][transactionId].accountId = accountId;
                                accountTransactions[y][m][transactionId].accountTypeId = action.payload[accountId].type;
                            }

                            combinedTransactions[y][m] = {
                                ...combinedTransactions[y][m],
                                ...accountTransactions[y][m]
                            };
                        }
                    }
                }
            }

            let activeYears = Object.keys(combinedTransactions);
            if (!activeYears.includes(currentYear)) {
                activeYears.push(currentYear);
            }
            localStorage.setItem('startYear', JSON.stringify(activeYears[0]));
            localStorage.setItem('currentDisplayYear', currentYear);

            return {
                ...state,
                lifetimeTransactions: combinedTransactions,
                activeYears: activeYears,
            };
        case types.CALCULATE_STATISTICS:
            let data = state.lifetimeTransactions;

            let transactions = [];
            let transactionWantsDictionary = {};
            let transactionDictionary = [];
            for (let year in data) {
                for (let month in data[year]) {
                    for (let transactionId in data[year][month]) {
                        let transaction = data[year][month][transactionId];
                        transactions.push(transaction);
                        if (transaction.name in transactionWantsDictionary && categories[transaction.type].type === 'Want') {
                            transactionWantsDictionary[transaction.name].times += 1;
                            transactionWantsDictionary[transaction.name].amount += transaction.amount;
                        } else if (categories[transaction.type].type === 'Want') {
                            transactionWantsDictionary = { ...transactionWantsDictionary, [transaction.name]: { times: 1, amount: transaction.amount } };
                        }
                        if (!transactionDictionary.includes(transaction.name)) {
                            transactionDictionary = [...transactionDictionary, transaction.name];
                        }
                    }
                }
            }
            let transactionOverview = getOverview(transactions);
            let sortedDictionary = Object.keys(transactionWantsDictionary).map((key) => [key, transactionWantsDictionary[key]]);
            let sortTimes = sortedDictionary.sort(sortByTimes).slice(0, 10).map((data, i) => {
                return {
                    id: i,
                    place: i + 1,
                    name: data[0],
                    amount: data[1].times
                }
            });
            let sortAmount = sortedDictionary.sort(sortByAmount).slice(0, 10).map((data, i) => {
                return {
                    id: i,
                    place: i + 1,
                    name: data[0],
                    amount: data[1].amount
                }
            });

            return {
                ...state,
                lifetimeNet: transactionOverview.net,
                transactionDictionary: transactionDictionary,
                topVisited_amount: sortAmount,
                topVisited_times: sortTimes
            };
        case types.DELETE_ALL_TRANSACTIONS:
            return {
                ...initialState,
                activeYears: [new Date().getFullYear()]
            };
        case types.LOGOUT:
            return initialState;
        default:
            return state;
    }
}

export default statisticReducer;