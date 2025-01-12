import SortAscending from "./SortAscending";
import SortDescending from "./SortDescending";

const AddFilter = (filters, sortData, transactions) => {
    let filteredTransactions = [];
    for (let filter of filters) {
        switch (filter.type) {
            case 'TYPE':
                const filteredByType = transactions.filter((transaction) => transaction.type === filter.criteria);
                filteredTransactions = [...filteredTransactions, ...filteredByType];
                break;
            case 'DATE':
                if (filteredTransactions.length === 0) {
                    const filteredByDate = transactions.filter((transaction) => transaction.date === filter.criteria);
                    filteredTransactions = [...filteredTransactions, ...filteredByDate];
                } else {
                    filteredTransactions = filteredTransactions.filter((transaction) => transaction.date === filter.criteria);
                }
                break;
            case 'NAME':
                const filteredByName = transactions.filter((transaction) => transaction.name === filter.criteria);
                filteredTransactions = [...filteredTransactions, ...filteredByName];
                break;
            case 'AMOUNT':
                const filteredByAmount = transactions.filter((transaction) => transaction.amount === filter.criteria);
                filteredTransactions = [...filteredTransactions, ...filteredByAmount];
                break;
            default:
                break;
        }
    }
    if (sortData.isSortAsc) {
        filteredTransactions = SortAscending({
            type: sortData.sortColumn,
            headers: sortData.headers,
            transactions: filteredTransactions
        });
    } else {
        filteredTransactions = SortDescending({
            type: sortData.sortColumn,
            headers: sortData.headers,
            transactions: filteredTransactions
        });
    }
    return filteredTransactions;
    // return transactions.filter((transaction) => transaction.type === filter); // filtered data is filtered again (@#$&(#&$(@$&(#794732934))))
}

const RemoveFilter = (filters, sortData, transactions) => {
    if (filters.length === 0) {
        return transactions;
    }
    return AddFilter(filters, sortData, transactions);
}

const ClearFilter = (transactions) => {
    return transactions;
}

const FilterData = (data) => {
    const { type, filters, sortData, transactions } = data;
    switch (type) {
        case 'ADD':
            return AddFilter(filters, sortData, transactions);
        case 'REMOVE':
            return RemoveFilter(filters, sortData, transactions);
        case 'CLEAR':
            return ClearFilter(transactions);
        default:
            return transactions;
    }
}

export default FilterData;