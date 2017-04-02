/**
 * Created by Liming on 2017/4/2.
 */
"use strict";
import expect from 'expect';
import {describe, it} from 'mocha';

import RootReducer from '../../src/app/reducers';
import * as actions from '../../src/app/actions';

const m1 = {
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
const m2 = {
    _id: '1491106834114jinliming2@gmail.com',
    id: '',
    head: 'ca81c196c777435daa6eb1363309c195',
    email: 'jinliming2@gmail.com',
    time: Date.now(),
    message: 'Test Message'
};

describe('reducers', () => {
    let state = undefined;
    it('init', () => {
        state = RootReducer(state, {});
        expect(state).toEqual({
            messages: []
        });
    });
    it('LOAD_ALL_MESSAGES', () => {
        state = RootReducer(state, actions.loadAllMessages(m1));
        expect(state).toEqual({
            messages: [m1.rows[0].doc]
        });
    });
    it('LOAD_MESSAGES', () => {
        state = RootReducer(state, actions.loadMessages(m2));
        expect(state).toEqual({
            messages: [m2, m1.rows[0].doc]
        });
    });
    it('SEND_MESSAGE', () => {
        state = RootReducer(state, actions.sendMessage());
        expect(state).toEqual({
            messages: [m2, m1.rows[0].doc]
        });
    });
    it('CATCH_EXCEPTION', () => {
        state = RootReducer(state, actions.catchException(new Error()));
        expect(state).toEqual({
            messages: [m2, m1.rows[0].doc]
        });
    });
});
