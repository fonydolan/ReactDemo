//http://div.io/topic/1309
Action:
相当于行为契约，定义规定行为，和行为需要的参数。
action 仅仅是预处理，将脏数据筛选掉，它未必产生了可以直接合并到全局对象的数据与结构，它甚至可能只是提供了线索，表示「需要获取某某数据，但不在我这儿」。
action 函数的设计，也为它「只提供线索」的做法提供了支持，action 函数必须返回一个带有 type 属性的 plain object。

//添加 item 只需要一个 text 字符串数据
export function addItem(text) {
    return {
        type: 'ADD_ITEM',
        text
    }
}


Reducer:
reducer 只是一个模式匹配的东西，真正处理数据的函数，是额外在别的地方写的，在 reducer 中调用罢了。

reducer 为什么叫 reducer 呢？
因为 action 对象各种各样，每种对应某个 case ，但最后都汇总到 state 对象中，从多到一，
这是一个减少( reduce )的过程，所以完成这个过程的函数叫 reducer。

//reducer 接受两个参数，全局数据对象 state 以及 action 函数返回的 action 对象
//返回新的全局数据对象 new state
export default (state, action) => {
    switch (action.type) {
        case A:
        return handleA(state)
        case B:
        return handleB(state)
        case C:
        return handleC(state)
        default:
        return state //如果没有匹配上就直接返回原 state
    }
}



