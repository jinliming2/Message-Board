/**
 * Created by Liming on 2017/3/30.
 */
"use strict";
import React, {Component} from 'react';
import {connect} from 'react-redux';

import {fetchMessages, loadMessages, catchException} from '../actions';
import LeaveMessage from './leaveMessage';
import MessageList from './messageList';

import {DB_NAME, DB_HOST, DB_PORT} from '../config';

const PouchDB = require('pouchdb');
const db = new PouchDB(DB_NAME);

class App extends Component {
    /* istanbul ignore next */
    constructor(props) {
        super(props);
    }

    getChildContext() {
        return {
            db: db
        };
    }

    componentWillMount() {
        const {dispatch} = this.props;

        dispatch(fetchMessages(db));

        /* istanbul ignore next */
        this.sync = this.sync || db.sync(`http://${window.location.host}/${DB_NAME}`, {
            live: true,
            retry: true
        })
            .on('denied', err => dispatch(catchException(err)))
            .on('error', err => dispatch(catchException(err)));

        /* istanbul ignore next */
        this.changes = this.changes || db.changes({
            since: 'now',
            live: true,
            include_docs: true
        })
            .on('change', change => dispatch(loadMessages(change.doc)))
            .on('error', err => dispatch(catchException(err)));
    }

    componentWillUnmount() {
        this.changes.cancel();
        this.sync.cancel();
    }

    render() {
        const {messages} = this.props;

        return (
            <div className="container">
                <LeaveMessage _id="" />
                <hr />
                <MessageList messages={messages} _id="" />
            </div>
        );
    }
}

App.childContextTypes = {
    db: React.PropTypes.object.isRequired
};

export default connect(state => ({messages: state.messages}))(App);
