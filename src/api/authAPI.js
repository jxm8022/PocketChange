import { auth } from "../firebaseConfig";
import {
    createUserWithEmailAndPassword
    , signInWithEmailAndPassword
    , sendPasswordResetEmail
    , signOut
} from "firebase/auth";

export const signUpUser = async (email, password) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
};

export const loginUser = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const token = await userCredential.user.getIdToken();
    return { user: userCredential.user, token };
};

export const logoutUser = async () => {
    await signOut(auth);
};

export const resetPassword = async (email) => {
    await sendPasswordResetEmail(auth, email);
};