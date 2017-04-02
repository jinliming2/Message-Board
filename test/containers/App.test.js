/**
 * Created by Liming on 2017/4/2.
 */
"use strict";
import expect from 'expect';
import {mount} from 'enzyme';
import {describe, it} from 'mocha';
import React from 'react';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunkMiddleware from 'redux-thunk';

import RootReducer from '../../src/app/reducers';
import App from '../../src/app/unit/app';
import LeaveMessage from '../../src/app/unit/leaveMessage';
import MessageList from '../../src/app/unit/messageList';

describe('containers', () => {
    describe('App', () => {
        it('should render LeaveMessage and MessageList', () => {
            const store = createStore(RootReducer, {messages: []}, applyMiddleware(thunkMiddleware));
            const wrapper = mount(
                <Provider store={store}>
                    <App />
                </Provider>
            );
            expect(wrapper.find(LeaveMessage).exists()).toBe(true);
            expect(wrapper.find(MessageList).exists()).toBe(true);
        });
        it('LeaveMessage check', () => {
            const store = createStore(RootReducer, {messages: []}, applyMiddleware(thunkMiddleware));
            const wrapper = mount(
                <Provider store={store}>
                    <App />
                </Provider>
            );
            expect(wrapper.find('form.line').exists()).toBe(true);
            expect(wrapper.find('form.line > div').length).toBe(3);
            expect(wrapper.find('form.line > div').at(0).find('label[htmlFor="email"]').exists()).toBe(true);
            expect(wrapper.find('form.line > div').at(0).find('label[htmlFor="email"]').text()).toBe('邮箱：');
            expect(wrapper.find('form.line > div').at(0).find('input#email').exists()).toBe(true);
            expect(wrapper.find('form.line > div').at(1).find('label[htmlFor="content"]').exists()).toBe(true);
            expect(wrapper.find('form.line > div').at(1).find('label[htmlFor="content"]').text()).toBe('内容：');
            expect(wrapper.find('form.line > div').at(1).find('input#content').exists()).toBe(true);
            expect(wrapper.find('form.line > div').at(2).find('button[type="submit"]').exists()).toBe(true);
            expect(wrapper.find('form.line > div').at(2).find('button[type="submit"]').text()).toBe('留言');
        });
        it('MessageList check', () => {
            const state = {
                messages: [{
                    _id: '1491106834114jinliming2@gmail.com',
                    id: '',
                    head: 'ca81c196c777435daa6eb1363309c195',
                    email: 'jinliming2@gmail.com',
                    time: Date.now(),
                    message: 'Test Message'
                }]
            };
            const store = createStore(RootReducer, state, applyMiddleware(thunkMiddleware));
            const wrapper = mount(
                <Provider store={store}>
                    <App />
                </Provider>
            );
            expect(wrapper.find('div.discuss').exists()).toBe(true);
            expect(wrapper.find('div.discuss > img.discuss-head').exists()).toBe(true);
            expect(wrapper.find('div.discuss > div.discuss-body').exists()).toBe(true);
            expect(wrapper.find('div.discuss > div.discuss-body > span.discuss-name').exists()).toBe(true);
            expect(wrapper.find('div.discuss > div.discuss-body > span.discuss-name').text()).toBe('***@gmail.com');
            expect(wrapper.find('div.discuss > div.discuss-body > span.discuss-time').exists()).toBe(true);
            expect(wrapper.find('div.discuss > div.discuss-body > span.discuss-time').text()).toBe((new Date(state.messages[0].time)).toLocaleString());
            expect(wrapper.find('div.discuss > div.discuss-body > div.discuss-content').exists()).toBe(true);
            expect(wrapper.find('div.discuss > div.discuss-body > div.discuss-content > p').exists()).toBe(true);
            expect(wrapper.find('div.discuss > div.discuss-body > div.discuss-content > p').text()).toBe(state.messages[0].message);
            expect(wrapper.find('div.discuss > div.discuss-body > div.discuss-content > div.discuss-footer').exists()).toBe(true);
            expect(wrapper.find('div.discuss').find(LeaveMessage).exists()).toBe(true);
        });
        it('MessageList > LeaveMessage check', () => {
            const state = {
                messages: [{
                    _id: '1491106834114jinliming2@gmail.com',
                    id: '',
                    head: 'ca81c196c777435daa6eb1363309c195',
                    email: 'jinliming2@gmail.com',
                    time: Date.now(),
                    message: 'Test Message'
                }]
            };
            const store = createStore(RootReducer, state, applyMiddleware(thunkMiddleware));
            const wrapper = mount(
                <Provider store={store}>
                    <App />
                </Provider>
            );
            expect(wrapper.find('div.discuss').find(LeaveMessage).find('form.line').exists()).toBe(true);
            expect(wrapper.find('div.discuss').find(LeaveMessage).find('form.line > div').length).toBe(3);
            expect(wrapper.find('div.discuss').find(LeaveMessage).find('form.line > div').at(0).find('label[htmlFor="email"]').exists()).toBe(true);
            expect(wrapper.find('div.discuss').find(LeaveMessage).find('form.line > div').at(0).find('label[htmlFor="email"]').text()).toBe('邮箱：');
            expect(wrapper.find('div.discuss').find(LeaveMessage).find('form.line > div').at(0).find('input#email').exists()).toBe(true);
            expect(wrapper.find('div.discuss').find(LeaveMessage).find('form.line > div').at(1).find('label[htmlFor="content"]').exists()).toBe(true);
            expect(wrapper.find('div.discuss').find(LeaveMessage).find('form.line > div').at(1).find('label[htmlFor="content"]').text()).toBe('内容：');
            expect(wrapper.find('div.discuss').find(LeaveMessage).find('form.line > div').at(1).find('input#content').exists()).toBe(true);
            expect(wrapper.find('div.discuss').find(LeaveMessage).find('form.line > div').at(2).find('button[type="submit"]').exists()).toBe(true);
            expect(wrapper.find('div.discuss').find(LeaveMessage).find('form.line > div').at(2).find('button[type="submit"]').text()).toBe('回复');
        });
        it('Raise LeaveMessage Event', () => {
            const store = createStore(RootReducer, {messages: []}, applyMiddleware(thunkMiddleware));
            const wrapper = mount(
                <Provider store={store}>
                    <App />
                </Provider>
            );
            wrapper.find('form.line > div').at(2).find('button[type="submit"]').at(0).simulate('click');
            wrapper.find('form.line').at(0).simulate('submit');
        });
        it('Raise LeaveMessage Event (Reply)', () => {
            const state = {
                messages: [{
                    _id: '1491106834114jinliming2@gmail.com',
                    id: '',
                    head: 'ca81c196c777435daa6eb1363309c195',
                    email: 'jinliming2@gmail.com',
                    time: Date.now(),
                    message: 'Test Message'
                }]
            };
            const store = createStore(RootReducer, state, applyMiddleware(thunkMiddleware));
            const wrapper = mount(
                <Provider store={store}>
                    <App />
                </Provider>
            );
            wrapper.find('div.discuss').find(LeaveMessage).find('form.line > div').at(2).find('button[type="submit"]').at(0).simulate('click');
            wrapper.find('div.discuss').find(LeaveMessage).find('form.line').at(0).simulate('submit');
        });
        it('UnMount', () => {
            const store = createStore(RootReducer, {messages: []}, applyMiddleware(thunkMiddleware));
            const wrapper = mount(
                <Provider store={store}>
                    <App />
                </Provider>
            );
            wrapper.unmount();
        });
    });
});
