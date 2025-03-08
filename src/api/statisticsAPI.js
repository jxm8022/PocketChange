import { db } from "../firebaseConfig";
import { ref, get } from "firebase/database";

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

export const getAccountMonthStatisticsAsync = async (userId, accountId, year, month) => {
    const accountMonthStatisticsRef = ref(db, `${userId}/statistics/${year}/${month}/${accountId}`);
    const snapshot = await get(accountMonthStatisticsRef);
    return snapshot.exists() ? snapshot.val() : null;
};

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

export const getYearStatisticsAsync = async (userId, year) => {
    const yearStatisticsRef = ref(db, `${userId}/statistics/${year}`);
    const snapshot = await get(yearStatisticsRef);
    return snapshot.exists() ? snapshot.val() : null;
};

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