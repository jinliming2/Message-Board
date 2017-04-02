/**
 * Created by Liming on 2017/4/2.
 */
"use strict";
import expect from 'expect';
import {describe, it} from 'mocha';
import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';

import RootReducer from '../../src/app/reducers';
import * as actions from '../../src/app/actions';

describe('actions', () => {
    describe('loadAllMessages', () => {
        it('Generate action', () => {
            const message = {
                rows: [{
                    doc: {
                        _id: '1491106834114jinliming2@gmail.com',
                        id: '',
                        head: 'ca81c196c777435daa6eb1363309c195',
                        email: 'jinliming2@gmail.com',
                        time: Date.now(),
                        message: 'Test Message'
                    },
                }]
            };
            expect(actions.loadAllMessages(message)).toEqual({
                type: actions.LOAD_ALL_MESSAGES,
                payload: {
                    messages: message
                }
            });
        });
        it('Dispatch', () => {
            const store = createStore(RootReducer, {messages: []}, applyMiddleware(thunkMiddleware));
            const message = {
                rows: [{
                    doc: {
                        _id: '1491106834114jinliming2@gmail.com',
                        id: '',
                        head: 'ca81c196c777435daa6eb1363309c195',
                        email: 'jinliming2@gmail.com',
                        time: Date.now(),
                        message: 'Test Message'
                    },
                }]
            };
            store.dispatch(actions.loadAllMessages(message));
            expect(store.getState()).toEqual({
                messages: [message.rows[0].doc]
            });
        });
    });
    describe('loadMessages', () => {
        it('Generate action', () => {
            const message = {
                _id: '1491106834114jinliming2@gmail.com',
                id: '',
                head: 'ca81c196c777435daa6eb1363309c195',
                email: 'jinliming2@gmail.com',
                time: Date.now(),
                message: 'Test Message'
            };
            expect(actions.loadMessages(message)).toEqual({
                type: actions.LOAD_MESSAGES,
                payload: {
                    message: message
                }
            });
        });
        it('Dispatch', () => {
            const store = createStore(RootReducer, {messages: []}, applyMiddleware(thunkMiddleware));
            const message = {
                _id: '1491106834114jinliming2@gmail.com',
                id: '',
                head: 'ca81c196c777435daa6eb1363309c195',
                email: 'jinliming2@gmail.com',
                time: Date.now(),
                message: 'Test Message'
            };
            store.dispatch(actions.loadMessages(message));
            expect(store.getState()).toEqual({
                messages: [message]
            });
        });
    });
    describe('sendMessage', () => {
        it('Generate action', () => {
            expect(actions.sendMessage()).toEqual({
                type: actions.SEND_MESSAGE,
                payload: {}
            });
        });
        it('Dispatch', () => {
            const store = createStore(RootReducer, {messages: []}, applyMiddleware(thunkMiddleware));
            store.dispatch(actions.sendMessage());
            expect(store.getState()).toEqual({
                messages: []
            });
        });
    });
    describe('catchException', () => {
        it('Generate action', () => {
            const err = new Error();
            expect(actions.catchException(err)).toEqual({
                type: actions.CATCH_EXCEPTION,
                payload: {
                    err: err
                }
            });
        });
        it('Dispatch', () => {
            const err = new Error();
            const store = createStore(RootReducer, {messages: []}, applyMiddleware(thunkMiddleware));
            store.dispatch(actions.catchException(err));
            expect(store.getState()).toEqual({
                messages: []
            });
        });
    });
});
