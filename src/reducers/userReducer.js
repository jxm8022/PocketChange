import * as types from '../actions/actionTypes';
import { LoadUserData, SaveUserData } from '../api/userAPI';
import CalculateRemainingTime from '../utilities/CalculateRemainingTime';

const initialState = {
    name: '',
    startYear: new Date().getFullYear(),
    currentYear: new Date().getFullYear(),
    userId: null,
    token: null,
    expirationTime: null,
    isLoggedIn: false
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.LOAD_USER:
            const loadedUser = LoadUserData();

            let newLoadState = { ...state };

            if (loadedUser) {
                const remainingDuration = CalculateRemainingTime(loadedUser.expirationTime);
                if (remainingDuration <= 3600) {
                    newLoadState = {
                        ...state,
                        userId: null,
                        token: null,
                        expirationTime: null,
                        isLoggedIn: false,
                        currentYear: new Date().getFullYear()
                    }
                } else {
                    newLoadState = {
                        ...state,
                        startYear: loadedUser.startYear,
                        userId: loadedUser.userId,
                        token: loadedUser.token,
                        expirationTime: loadedUser.expirationTime,
                        isLoggedIn: loadedUser.isLoggedIn,
                        currentYear: new Date().getFullYear()
                    }
                }
            }

            return newLoadState;
        case types.LOGIN:
            const loginExpirationTime = new Date(new Date().getTime() + +action.payload.expiresIn * 1000);
            let newLoginState = {
                ...state,
                userId: action.payload.localId,
                token: action.payload.idToken,
                expirationTime: loginExpirationTime.toISOString(),
                isLoggedIn: true
            }

            SaveUserData(newLoginState);
            return newLoginState;
        case types.LOGOUT:
            let newLogoutState = {
                ...state,
                userId: null,
                token: null,
                expirationTime: null,
                isLoggedIn: false
            }

            SaveUserData(newLogoutState);
            return newLogoutState;
        default:
            return state;
    }
}

export default userReducer;