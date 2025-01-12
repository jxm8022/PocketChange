export const patchAccountMonthStatistics = async (userId, accountId, year, month, payload, token) => {
    const updateURL = `${process.env.REACT_APP_FIREBASE_DATABASE_URL}/${userId}/statistics/${year}/${month}/${accountId}.json?auth=${token}`;
    return fetch(
        updateURL,
        {
            method: 'PATCH',
            body: JSON.stringify(payload),
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
        });
}

export const fetchAccountMonthStatistics = (userId, accountId, year, month, token) => {
    const loadURL = `${process.env.REACT_APP_FIREBASE_DATABASE_URL}/${userId}/statistics/${year}/${month}/${accountId}.json?auth=${token}`;
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

export const fetchMonthStatistics = (userId, year, month, token) => {
    const loadURL = `${process.env.REACT_APP_FIREBASE_DATABASE_URL}/${userId}/statistics/${year}/${month}.json?auth=${token}`;
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

export const fetchYearStatistics = (userId, year, token) => {
    const loadURL = `${process.env.REACT_APP_FIREBASE_DATABASE_URL}/${userId}/statistics/${year}.json?auth=${token}`;
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