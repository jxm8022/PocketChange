import * as types from '../actions/actionTypes';

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
            return state;
        case types.LOGIN:
            const loginExpirationTime = new Date(new Date().getTime() + +action.payload.expiresIn * 1000);
            let newLoginState = {
                ...state,
                userId: action.payload.localId,
                token: action.payload.idToken,
                expirationTime: loginExpirationTime.toISOString(),
                isLoggedIn: true
            }

            return newLoginState;
        case types.LOGOUT:
            let newLogoutState = {
                ...state,
                userId: null,
                token: null,
                expirationTime: null,
                isLoggedIn: false
            }

            return newLogoutState;
        default:
            return state;
    }
}

export default userReducer;