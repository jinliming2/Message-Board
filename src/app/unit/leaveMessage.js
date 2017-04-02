/**
 * Created by Liming on 2017/4/1.
 */
"use strict";
import React, {Component} from 'react';
import {connect} from 'react-redux';

import {leaveMessage} from '../actions';

class LeaveMessage extends Component {
    constructor(props, context) {
        super(props, context);
    }

    leaveMessage(email, message) {
        const {dispatch, _id} = this.props;
        const {db} = this.context;

        dispatch(leaveMessage(db, email, message, _id));

        return false;
    }

    render() {
        const {_id} = this.props;

        let email, newMessage;

        return (
            <form
                className="line"
                onSubmit={e => {
                    e.preventDefault();
                    this.leaveMessage(email.value, newMessage.value);
                    newMessage.value = '';
                }}
            >
                <div>
                    <label htmlFor="email">邮箱：</label>
                    <input id="email" type="email" required="required" placeholder="Email" ref={node => email = node}/>
                </div>
                <div>
                    <label htmlFor="content">内容：</label>
                    <input id="content" type="text" required="required" placeholder="说点什么。。" ref={node => newMessage = node}/>
                </div>
                <div>
                    <button type="submit">
                        {_id === '' ? '留言' : '回复'}
                    </button>
                </div>
            </form>
        );
    }
}

LeaveMessage.contextTypes = {
    db: React.PropTypes.object.isRequired
};

export default connect(state => ({}))(LeaveMessage);
