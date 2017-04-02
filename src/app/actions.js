/**
 * Created by Liming on 2017/3/29.
 */
"use strict";
const md5 = require('md5');

export const LOAD_ALL_MESSAGES = 'LOAD_ALL_MESSAGES';
export const LOAD_MESSAGES = 'LOAD_MESSAGES';
export const SEND_MESSAGE = 'SEND_MESSAGE';
export const CATCH_EXCEPTION = 'CATCH_EXCEPTION';

/**
 * 获取所有留言
 * @param db
 * @return {function(*)}
 */
export function fetchMessages(db) {
    /* istanbul ignore next */
    return dispatch => db.allDocs({
        include_docs: true
    })
        .then(result => dispatch(loadAllMessages(result)))
        .catch(err => dispatch(catchException(err)));
}

/* istanbul ignore next */
/**
 * 留言
 * @param db
 * @param email
 * @param message
 * @param _id
 * @return {function(*)}
 */
export function leaveMessage(db, email, message, _id = '') {
    return dispatch => db.put({
        _id: Date.now() + email,
        id: _id,
        head: md5(email.trim().toLowerCase()),
        email: email,
        time: Date.now(),
        message: message
    })
        .then(dispatch(sendMessage()))
        .catch(err => dispatch(catchException(err)));
}

/**
 * 加载所有留言
 * @param messages
 * @return {{type: string, payload: {messages: *}}}
 */
export function loadAllMessages(messages) {
    return {
        type: LOAD_ALL_MESSAGES,
        payload: {
            messages
        }
    };
}

/**
 * 加载新留言
 * @param message
 * @return {{type: string, payload: {message: *}}}
 */
export function loadMessages(message) {
    return {
        type: LOAD_MESSAGES,
        payload: {
            message
        }
    };
}

/**
 * 发送留言
 * @return {{type: string, payload: {}}}
 */
export function sendMessage() {
    return {
        type: SEND_MESSAGE,
        payload: {
        }
    }
}

export function catchException(err) {
    return {
        type: CATCH_EXCEPTION,
        payload: {
            err
        }
    }
}
