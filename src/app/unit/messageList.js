/**
 * Created by Liming on 2017/3/31.
 */
"use strict";
import React, {Component} from 'react';
import {connect} from 'react-redux';

import LeaveMessage from './leaveMessage';

class MessageList extends Component {
    /* istanbul ignore next */
    constructor(props) {
        super(props);
    }

    render() {
        const {messages, _id} = this.props;

        return (
            <div className="list">
                {messages.filter(m => m.id === _id).map((message, id) =>
                    <div key={id} className="discuss">
                        <img className="discuss-head" src={`https://www.gravatar.com/avatar/${message.head}`} width="60" height="60"/>
                        <div className="discuss-body">
                            <span className="discuss-name">{message.email.replace(/^[^@]*/, '***')}</span>
                            <span className="discuss-time">{(new Date(message.time)).toLocaleString()}</span>
                            <div className="discuss-content">
                                <p>{message.message}</p>
                                <div className="discuss-footer">
                                    <LeaveMessage _id={message._id}/>
                                </div>
                                <hr/>
                                <MessageList messages={messages} _id={message._id}/>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default connect(state => ({}))(MessageList);
