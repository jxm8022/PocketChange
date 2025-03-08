import { db } from "../firebaseConfig";
import { ref, get, set, push, update, remove } from "firebase/database";

export const getSubscriptionsAsync = async (userId) => {
    const subscriptionsRef = ref(db, `${userId}/subscriptions`);
    const snapshot = await get(subscriptionsRef);
    return snapshot.exists() ? snapshot.val() : null;
};

export const addSubscriptionAsync = async (userId, data) => {
    const subscriptionRef = push(ref(db, `${userId}/subscriptions`));
    await set(subscriptionRef, data);
    return subscriptionRef.key;
};

export const updateSubscriptionAsync = async (userId, subscriptionId, data) => {
    const subscriptionRef = ref(db, `${userId}/subscriptions/${subscriptionId}`);
    await update(subscriptionRef, data);
};

export const deleteSubscriptionAsync = async (userId, subscriptionId) => {
    const subscriptionRef = ref(db, `${userId}/subscriptions/${subscriptionId}`);
    await remove(subscriptionRef);
};