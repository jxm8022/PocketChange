export const addRecurringTransactionAPI = (userId, transaction, token) => { // date format yyyy-mm-dd
    const addURL = `${process.env.REACT_APP_FIREBASE_DATABASE_URL}/${userId}/recurringTransactions.json?auth=${token}`;
    return fetch(
        addURL,
        {
            method: 'POST',
            body: JSON.stringify(transaction),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                return res.json().then((data) => {
                    throw new Error(data.error);
                })
            }
        })
        .catch((err) => {
            alert(err.message);
        })
}

export const loadRecurringTransactionsAPI = (userId, token) => {
    const loadURL = `${process.env.REACT_APP_FIREBASE_DATABASE_URL}/${userId}/recurringTransactions.json?auth=${token}`;
    return fetch(loadURL)
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                return res.json().then((data) => {
                    throw new Error(data.error);
                });
            }
        })
        .catch((err) => {
            alert(err.message);
        });
}

export const deleteRecurringTransactionAPI = (userId, transactionId, token) => {
    const deleteURL = `${process.env.REACT_APP_FIREBASE_DATABASE_URL}/${userId}/recurringTransactions/${transactionId}.json?auth=${token}`;
    return fetch(
        deleteURL,
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                return res.json().then((data) => {
                    throw new Error(data.error.message);
                })
            }
        })
        .catch((err) => {
            alert(err.message);
        })
    }