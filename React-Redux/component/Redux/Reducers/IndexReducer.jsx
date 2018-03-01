
import {TO_SEARCH_PAGE} from "../Common/ActionTypes";

export default (state=[],action)=>{
    switch(action.type){
        case TO_SEARCH_PAGE://查询搜索页
            return [toSearchPage(),state];
        default:
            return state;
    }
}

