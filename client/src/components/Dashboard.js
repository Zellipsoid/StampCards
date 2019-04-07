import React, { Component } from "react";
import QrReader from 'react-qr-reader'
// import {
//   Transition
// } from "semantic-ui-react";
var QRCode = require('qrcode.react');

class Dashboard extends Component {
    state = {
        result: 'no result'
    }
    constructor(props) {
        super(props);
    }
    handleScan = data => {
        if (data) {
            this.setState({
                result: data
            })
        }
    }
    handleError = err => {
        console.error(err)
    }
    render() {
        return (
            <div>
                <div>
                    <p>This is the dashboard</p>
                    <QRCode value={this.props.username} />
                </div>
                <QrReader
                    delay={300}
                    onError={this.handleError}
                    onScan={this.handleScan}
                    style={{ width: '100%' }}
                />
                <p>{this.state.result}</p>
            </div>

        );
    }
}

export default Dashboard;
