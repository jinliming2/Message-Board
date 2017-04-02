/**
 * Created by Liming on 2017/3/28.
 */
"use strict";
import React from 'react';
import {createStore, applyMiddleware} from 'redux';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import thunkMiddleware from 'redux-thunk';

import RootReducer from './reducers';
import App from './unit/app';

let store = createStore(RootReducer, applyMiddleware(thunkMiddleware));

let rootElement = document.getElementById('app-root');

render(
    <Provider store={store}>
        <App />
    </Provider>,
    rootElement
);
