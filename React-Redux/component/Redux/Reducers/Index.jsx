import {combineReducers} from "redux";
import IndexReducer from "./IndexReducer";
import IndexSearchReducer from "./IndexSearchReducer";

export default combineReducers({
    index:IndexReducer,
    indexSearch:IndexSearchReducer
})
//combineReducers 获得 rootReducer