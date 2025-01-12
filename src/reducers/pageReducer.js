import * as types from '../actions/actionTypes';

const initialState = {
    message: '',
}

const pageReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_MESSAGE:
            let newState = {
                ...state,
                message: action.payload
            };

            return newState;
        default:
            return state;
    }
}

export default pageReducer;