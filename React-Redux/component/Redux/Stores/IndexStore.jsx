import rootReducers from "../Reducers/Index";
import {createStore} from "redux";

export default initialState=>{
    return createStore(rootReducers,initialState);
}
//用 createStore 把 rootReducer 给吞掉 得到store 