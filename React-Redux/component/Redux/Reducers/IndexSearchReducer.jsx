import {HOT_SEARCH_WORDS} from "../Common/ActionTypes";

export default (state=[],action)=>{
    switch(action.type)
    {
        case  HOT_SEARCH_WORDS://热门搜索词
            return hotSearchWordsList(action.text);
        default:
            return state;       
    }

}