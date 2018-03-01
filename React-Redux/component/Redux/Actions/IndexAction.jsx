//定义行为契约 参数和名称

import * as TYPES from "../Common/ActionTypes";

export function ToSearchPage() {
    return {
        type:TYPES.TOPAGE_INDEX_SEARCH
    }
}