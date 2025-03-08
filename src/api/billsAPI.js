import { db } from "../firebaseConfig";
import { ref, get, set, push, update, remove } from "firebase/database";

export const getBillsAsync = async (userId) => {
    const billsRef = ref(db, `${userId}/bills`);
    const snapshot = await get(billsRef);
    return snapshot.exists() ? snapshot.val() : null;
};

export const addBillAsync = async (userId, data) => {
    const billRef = push(ref(db, `${userId}/bills`));
    await set(billRef, data);
    return billRef.key;
};

export const updateBillAsync = async (userId, billId, data) => {
    const billRef = ref(db, `${userId}/bills/${billId}`);
    await update(billRef, data);
};

export const deleteBillAsync = async (userId, billId) => {
    const billRef = ref(db, `${userId}/bills/${billId}`);
    await remove(billRef);
};