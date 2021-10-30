import IsLogged from "./isLogged";
import Counter from "./counter";
import {combineReducers} from "redux";

const allReducers=combineReducers({
counter:Counter,
islog:IsLogged


});
export default allReducers; 



