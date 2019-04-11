import React, { Component } from "react";
import { Card, Statistic } from 'semantic-ui-react'
import "../App.css";
import EmployeeView from "./EmployeeView";
// import {
//   Transition
// } from "semantic-ui-react";
var QRCode = require('qrcode.react');

class Dashboard extends Component {
    state = {}
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
                        <EmployeeView socket={this.props.socket} user_data={this.props.user_data} />
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
            <QRCode value={props.user_data.username} style={{ width: '80%', height: 'auto', float: 'center' }} />
            <Card fluid header="Have a cashier scan this to earn or redeem points" />
            <Statistic color='red' size='huge' style={{ width: "100%" }}>
                <Statistic.Value>{props.user_data.stamps}</Statistic.Value>
                <Statistic.Label>Stamps Earned</Statistic.Label>
            </Statistic>
        </div>
    );
}