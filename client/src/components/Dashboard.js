import React, { Component } from "react";
import QrReader from 'react-qr-reader'
import { Card, Statistic } from 'semantic-ui-react'
import "../App.css";
// import {
//   Transition
// } from "semantic-ui-react";
var QRCode = require('qrcode.react');

class Dashboard extends Component {
    state = {
        result: 'no result'
    }
    // constructor(props) {
    //     super(props);
    // }
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
                {this.props.user_data.rank === null ?
                    <CustomerView user_data={this.props.user_data} />
                    :
                    <div>
                        <QrReader
                            delay={300}
                            onError={this.handleError}
                            onScan={this.handleScan}
                            style={{ width: '100%' }}
                        />
                        <Card fluid header="Aim this at a customer's QR code and tap the image" />
                    </div>
                }
            </div>

        );
    }
}

export default Dashboard;

function CustomerView(props) {
    return (

        <div>
            <QRCode value={props.user_data.username} style={{ width: '100%', height: 'auto' }} />
            <Card fluid header="Have a cashier scan this to earn or redeem points" />
            <Statistic color='red' size='huge' style={{ width: "100%" }}>
                <Statistic.Value>{props.user_data.stamps}</Statistic.Value>
                <Statistic.Label>Stamps Earned</Statistic.Label>
            </Statistic>
        </div>
    );
}