import React, { Component } from "react";
import QrReader from 'react-qr-reader'
import { Card, Statistic } from 'semantic-ui-react'
import "../App.css";
// import {
//   Transition
// } from "semantic-ui-react";

class EmployeeView extends Component {
    state = {
        result: 'no result',
        customer_info: {}
    }
    constructor(props) {
        super(props);
        props.socket.on("customer_info", (data) => {
            this.setState({ customer_info: data })
            console.log('got customer info!')
        });
    }

    handleScan = data => {
        if (data) {
            alert(data)
            this.props.socket.emit("retrieve_customer_data", {
                username_to_retrieve: data,
                username_requesting: this.props.user_data.username
            });
        }
    }
    handleError = err => {
        console.error(err)
    }
    render() {
        return (
            <div>
                <QrReader
                    delay={300}
                    onError={this.handleError}
                    onScan={this.handleScan}
                    style={{ width: '100%' }}
                />
                <Card fluid header="Aim this at a customer's QR code" />
            </div>
        );
    }
}

export default EmployeeView;
