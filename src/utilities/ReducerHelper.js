export const getOverview = (transactions) => {
    let pTransactionTotal = 0;
    let pIncomeTotal = 0;
    let incomeTotal = 0;
    let transactionsTotal = 0;
    for (let transaction of transactions) {
        switch (transaction.type) {
            case 0:
            case 1:
            case 2:
            case 3:
                transactionsTotal += transaction.amount;
                break;
            case 4:
                incomeTotal += transaction.amount;
                break;
            case 5:
                pTransactionTotal += transaction.amount;
                break;
            case 6:
                pIncomeTotal += transaction.amount;
                break;
            default:
                break;
        }
    }
    const net = incomeTotal - transactionsTotal;
    const potNet = net - pTransactionTotal;
    const projNet = potNet + pIncomeTotal;
    return {
        potNet,
        projNet,
        net,
        incomeTotal,
        transactionsTotal,
    };
}

export const getTransactionsOverview = (transactions) => {
    let incomeTotal = 0;
    let transactionsTotal = 0;
    for (let transaction of transactions) {
        switch (transaction.type) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 5:
                transactionsTotal += transaction.amount;
                break;
            case 4:
                incomeTotal += transaction.amount;
                break;
            default:
                break;
        }
    }
    const net = incomeTotal - transactionsTotal;
    return {
        net,
        incomeTotal,
        transactionsTotal,
    };
}

export const sortTransactionsByDate = (a, b) => {
    if (a.date < b.date) {
        return -1;
    }
    if (a.date > b.date) {
        return 1;
    }
    return 0;
}

export const sortTransactionsByDateDesc = (a, b) => {
    if (a.date > b.date) {
        return -1;
    }
    if (a.date < b.date) {
        return 1;
    }
    return 0;
}

export const sortRecurringTransactionsByDayAsc = (a, b) => {
    let transactionA = a.occurrenceValue ?? 0;
    let transactionB = b.occurrenceValue ?? 0;
    if (transactionA < transactionB) {
        return -1;
    }
    if (transactionA > transactionB) {
        return 1;
    }
    return 0;
}

export const sortByTimes = (a, b) => {
    if (a[1].times > b[1].times) {
        return -1;
    }
    if (a[1].times < b[1].times) {
        return 1;
    }
    return 0;
}

export const sortByAmount = (a, b) => {
    if (a[1].amount > b[1].amount) {
        return -1;
    }
    if (a[1].amount < b[1].amount) {
        return 1;
    }
    return 0;
}

export const transformObject = (obj) => {
    let clone = structuredClone(obj);

    if (!clone) {
        return [];
    }

    let transformedObj = Object.entries(clone).map(item => {
        return {
            id: item[0],
            ...item[1]
        };
    });

    return transformedObj;
}

export const sortByDate = (a, b) => {
    const dateCompare = a.date.localeCompare(b.date);
    return dateCompare !== 0 ? dateCompare : a.name.localeCompare(b.name);
}