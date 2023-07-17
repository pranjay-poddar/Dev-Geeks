
import { SET_LOADING_STATUS, GET_ARTICLES } from "../actions/actionType";

export const initState =  {
 articles: [], 
 loading: false,
};



const articleReducer = (state = initState, action) => {
    switch (action.type) { 
        // articles case
        case GET_ARTICLES: 
        // so it return the article existing state along with payloads
        return { 
        ...state,
        articles: action.payload,
        };
       // loading case
        case SET_LOADING_STATUS: 
        return {
            ...state,
            loading: action.status,
        };
        default: 
        return state;
    }
};

export default articleReducer;