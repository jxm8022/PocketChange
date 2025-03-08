import { db } from "../firebaseConfig";
import { ref, get, push, update } from "firebase/database";
import { getAccountAsync } from "./accountAPI";
import { getAccountMonthStatisticsAsync } from "./statisticsAPI";
import { CREDITACCOUNTTYPES, CREDITEXPENSETYPES, EXPENSETYPES } from "../resources/constants";

const isCreditAccount = (accountTypeId) => CREDITACCOUNTTYPES.includes(accountTypeId);

const isExpense = (isCreditAccountType, typeId) => isCreditAccountType ? CREDITEXPENSETYPES.includes(typeId) : EXPENSETYPES.includes(typeId);

export const getTransactionsAsync = async (userId, year, month) => {
    const transactionsRef = ref(db, `${userId}/transactions/${year}/${month}`);
    const snapshot = await get(transactionsRef);
    return snapshot.exists() ? snapshot.val() : null;
};

export const getTransactionDictionaryAsync = async (userId) => {
    const transactionDictionaryRef = ref(db, `${userId}/transactions/dictionary`);
    const snapshot = await get(transactionDictionaryRef);
    return snapshot.exists() ? snapshot.val() : null;
};

export const addTransactionAsync = async (userId, transaction) => {
    const { date, accountId } = transaction;
    const year = date.split('-')[0];
    const month = date.split('-')[1];

    const transactionRef = push(ref(db, `${userId}/transactions/${year}/${month}`));

    const updates = {};
    updates[`${userId}/transactions/${year}/${month}/${transactionRef.key}`] = transaction;
    updates[`${userId}/accounts/${accountId}/currentBalance`] = await getAccountBalanceAsync(userId, transaction);
    updates[`${userId}/statistics/${year}/${month}/${accountId}`] = await getAccountStatisticsAsync(userId, year, month, transaction);
    updates[`${userId}/transactions/dictionary/${transaction.name}`] = transaction.name;

    await update(ref(db), updates);

    return transactionRef.key;
};

export const deleteTransactionAsync = async (userId, transaction) => {
    const { date, accountId } = transaction;
    const year = date.split('-')[0];
    const month = date.split('-')[1];

    const updates = {};
    updates[`${userId}/transactions/${year}/${month}/${transaction.id}`] = null;
    updates[`${userId}/accounts/${accountId}/currentBalance`] = await getAccountBalanceAsync(userId, transaction, true);
    updates[`${userId}/statistics/${year}/${month}/${accountId}`] = await getAccountStatisticsAsync(userId, year, month, transaction, true);

    await update(ref(db), updates);
};

const getAccountBalanceAsync = async (userId, transaction, isDelete = false) => {
    const { accountId, amount, typeId } = transaction;

    const account = await getAccountAsync(userId, accountId);
    if (!account || account.currentBalance === undefined || account.typeId === undefined) {
        throw new Error('Invalid account data');
    }

    const isCredit = isCreditAccount(account.typeId);
    const isExpenseTx = isExpense(isCredit, typeId);

    const adjustment = isCredit ? (isExpenseTx ? -amount : amount) : (isExpenseTx ? amount : -amount);

    return isDelete ? (account.currentBalance + adjustment) : (account.currentBalance - adjustment);
}

const getAccountStatisticsAsync = async (userId, year, month, transaction, isDelete = false) => {
    const { accountId, amount, typeId } = transaction;

    const account = await getAccountAsync(userId, accountId);
    if (!account || account.typeId === undefined) {
        throw new Error('Invalid account data');
    }

    let accountMonthStatistics = await getAccountMonthStatisticsAsync(userId, accountId, year, month);
    if (!accountMonthStatistics) {
        accountMonthStatistics = { expenses: 0, income: 0 }
    }

    const isCredit = isCreditAccount(account.typeId);
    const isExpenseTx = isExpense(isCredit, typeId);

    const adjustment = isDelete ? amount : -amount;

    if (isExpenseTx) {
        accountMonthStatistics.expenses -= adjustment;
    } else {
        accountMonthStatistics.income -= adjustment;
    }

    return accountMonthStatistics;
}

export const deleteAllTransactionAPI = (userId, token) => {
    const deleteURL = `${process.env.REACT_APP_FIREBASE_DATABASE_URL}/${userId}.json?auth=${token}`;
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