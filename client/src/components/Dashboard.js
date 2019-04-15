import React, { Component } from "react";
import { Card, Statistic, Transition } from 'semantic-ui-react'
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
    render() {
        return (
            <div>
                {this.props.user_data.rank === null ?
                    <CustomerView user_data={this.props.user_data} run_animation={this.props.run_animation} />
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
            <div style={{ width: '85%', margin: '0 auto' }}>
                <QRCode value={props.user_data.username} style={{ width: '100%', height: 'auto' }} />
            </div>
            <Card fluid header="Have a cashier scan this to earn or redeem points" />
            <Transition animation={"jiggle"} duration={100} visible={props.run_animation}>
                <Statistic color='red' size='huge' style={{ width: "100%" }}>
                    <Statistic.Value>{props.user_data.stamps}</Statistic.Value>
                    <Statistic.Label>Stamps Earned</Statistic.Label>
                </Statistic>
            </Transition>
        </div >
    );
}