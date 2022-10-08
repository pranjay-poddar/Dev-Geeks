// Define initial value of user data

export const initialUserState = null;

export const userReducer = (state = initialUserState, action) => {


    if (action.type == "LOGIN") {
        return action.payload;
    }
    if (action.type == "LOGOUT") {
        return initialUserState;
    }
    else {
        return state;
    }
}