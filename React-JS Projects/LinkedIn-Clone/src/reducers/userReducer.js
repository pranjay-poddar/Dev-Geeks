import { SET_USER } from "../actions/actionType";

const INITIAL_STATE = {
    user: null,
};

const userReducer = (state = INITIAL_STATE,  action) => {
switch (action.type) {
    case SET_USER:
        return {
     ...state, 
     user: action.user,
        };
    default: 
    return state;
}
};

export default userReducer;

// reducer is a state updater

//example when we hit the like button it increase the number of like by 1

