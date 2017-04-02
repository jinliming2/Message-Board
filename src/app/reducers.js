/**
 * Created by Liming on 2017/4/1.
 */
"use strict";
import {LOAD_ALL_MESSAGES, LOAD_MESSAGES, SEND_MESSAGE, CATCH_EXCEPTION} from './actions';

const initialState = window.__JLM__INITIAL_STATE__ || {
    messages: []
};

export default function RootReducer(state = initialState, action) {
    switch(action.type) {
        case LOAD_ALL_MESSAGES:
            return loadAllMessageReducer(state, action);
        case LOAD_MESSAGES:
            return loadMessageReducer(state, action);
        case SEND_MESSAGE:
            return state;
        case CATCH_EXCEPTION:
            return state;
        default:
            return state;
    }
}

/**
 * 加载所有消息
 * @param state
 * @param action
 * @return {*}
 */
function loadAllMessageReducer(state, action) {
    let messages = [];
    action.payload.messages.rows.map(message => {
        messages.unshift({
            _id: message.doc._id,
            id: message.doc.id,
            head: message.doc.head,
            email: message.doc.email,
            time: message.doc.time,
            message: message.doc.message
        });
    });
    return Object.assign({}, state, {
        messages
    });
}

/**
 * 加载新消息
 * @param state
 * @param action
 * @return {*}
 */
function loadMessageReducer(state, action) {
    return Object.assign({}, state, {
        messages: [{
            _id: action.payload.message._id,
            id: action.payload.message.id,
            head: action.payload.message.head,
            email: action.payload.message.email,
            time: action.payload.message.time,
            message: action.payload.message.message
        }, ...state.messages]
    });
}
