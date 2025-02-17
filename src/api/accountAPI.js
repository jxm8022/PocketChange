import { db } from "../firebaseConfig";
import { ref, get, set, push, update } from "firebase/database";

export const getAccountAsync = async (userId, accountId) => {
    const accountRef = ref(db, `${userId}/accounts/${accountId}`);
    const snapshot = await get(accountRef);
    return snapshot.exists() ? snapshot.val() : null;
};

export const getAccountsAsync = async (userId) => {
    const accountsRef = ref(db, `${userId}/accounts`);
    const snapshot = await get(accountsRef);
    return snapshot.exists() ? snapshot.val() : null;
};

export const addAccountAsync = async (userId, data) => {
    const accountRef = push(ref(db, `${userId}/accounts`));
    await set(accountRef, data);
    return accountRef.key;
};

export const updateAccountAsync = async (userId, accountId, data) => {
    const accountsRef = ref(db, `${userId}/accounts/${accountId}`);
    await update(accountsRef, data);
};