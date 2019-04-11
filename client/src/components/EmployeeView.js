import React, { Component } from "react";
import QrReader from 'react-qr-reader'
import { Card, Statistic, Transition, Grid, Button } from 'semantic-ui-react'
import "../App.css";
// import {
//   Transition
// } from "semantic-ui-react";

class EmployeeView extends Component {
    state = {
        result: 'no result',
        customer_info: {},
        show_scanner: true,
        show_customer_info: false
    }
    constructor(props) {
        super(props);
        props.socket.on("customer_info", (data) => {
            this.setState({ customer_info: data })
            console.log('got customer info!')
            this.open_customer_info();
        });
    }
    open_customer_info = () => {
        this.setState({
            show_scanner: false
        });
        setTimeout(
            function () {
                this.setState({
                    show_customer_info: true
                });
            }.bind(this),
            250
        );
    };
    close_customer_info = () => {
        this.setState({
            show_customer_info: false
        });
        setTimeout(
            function () {
                this.setState({
                    show_scanner: true
                });
            }.bind(this),
            250
        );
    };
    handleScan = data => {
        if (data) {
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
                <Transition animation="fade" duration={250} visible={this.state.show_scanner}>
                    <div>
                        <QrReader
                            delay={300}
                            onError={this.handleError}
                            onScan={this.handleScan}
                            style={{ width: '100%' }}
                        />
                        <Card fluid header="Aim this at a customer's QR code" />
                    </div>
                </Transition>
                <Transition animation="fade" duration={250} visible={this.state.show_customer_info}>
                    <CustomerInfo customer_info={this.props.customer_info} />
                </Transition>
            </div>
        );
    }
}
function CustomerInfo(props) {
    return (
        <div>
            <Grid columns={3}>
                <Grid.Row>
                    <Grid.Column>
                        <Button>-</Button>
                    </Grid.Column>
                    <Grid.Column>
                        <Statistic color='red' size='huge' style={{ width: "100%" }}>
                            <Statistic.Value>{props.customer_info.stamps}</Statistic.Value>
                            <Statistic.Label>Stamps Added</Statistic.Label>
                        </Statistic>
                    </Grid.Column>
                    <Grid.Column>
                        <Button>+</Button>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    );
}
export default EmployeeView;
