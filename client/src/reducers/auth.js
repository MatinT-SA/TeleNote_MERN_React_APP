import { AUTH, LOGOUT } from '../constants/actionTypes'

const authReducer = (state = { authData: null }, action) => {
    switch (action.type) {
        case AUTH:
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }));

            // maybe we want to use optional chaining operator for the code below
            return { ...state, authData: action.data };
        case LOGOUT:
            localStorage.clear();

            return { ...state, authData: null };
        default:
            return state;
    }
}

export default authReducer;