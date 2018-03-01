import * as TYPES from "../Common/ActionTypes";

export default hotSearchWords(text)
{
    return {
        type:TYPES.HOT_SEARCH_WORDS,
        text
    }
}