import React, { Component } from "react";
import QrReader from 'react-qr-reader'
import { Card, Statistic, Transition, Grid, Button } from 'semantic-ui-react'
import EmployeeManagement from "./EmployeeManagement";
import "../App.css";
// import {
//   Transition
// } from "semantic-ui-react";

class EmployeeView extends Component {
    state = {
        result: 'no result',
        customer_info: {},
        show_scanner: true,
        show_customer_info: false,
        show_employee_management: false,
        new_number_of_stamps: 0,
        stamps_subtracted: false,
        redeem_value: 8
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
    open_management_panel = () => {
        this.setState({
            show_scanner: false
        });
        setTimeout(
            function () {
                this.setState({
                    show_employee_management: true
                });
            }.bind(this),
            250
        );
    };
    close_management_panel = () => {
        this.setState({
            show_employee_management: false
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
        if (data && this.state.show_scanner) {
            this.props.socket.emit("retrieve_customer_data", {
                username_to_retrieve: data,
                username_requesting: this.props.user_data.username
            });
        }
    }
    handleError = err => {
        console.error(err)
    }
    add_a_stamp = () => {
        console.log("Adding a stamp!")
        this.setState({ new_number_of_stamps: this.state.new_number_of_stamps + 1 })
    }
    redeem_stamps = () => {
        console.log("Redeeming stamps!")
        this.setState({ new_number_of_stamps: this.state.new_number_of_stamps - this.state.redeem_value, stamps_subtracted: true })
    }
    apply_stamps = () => {
        console.log("Saving data...")
        this.close_customer_info();
        this.props.socket.emit("update_customer_stamps", {
            username_to_update: this.state.customer_info.username,
            username_requesting: this.props.user_data.username,
            number_of_stamps: this.state.new_number_of_stamps
        });
        this.setState({ new_number_of_stamps: 0, stamps_subtracted: false, customer_info: {} });
    }
    render() {
        return (
            <div>
                <Transition.Group animation="fade" duration={250}>
                    {this.state.show_scanner && <div>
                        <QrReader
                            delay={300}
                            onError={this.handleError}
                            onScan={this.handleScan}
                            style={{ width: '100%' }}
                        />
                        <Card fluid header="Aim this at a customer's QR code" />
                        {this.props.user_data.rank >= 2 && <Button fluid onClick={this.open_management_panel}>Open Employee Management</Button>}
                    </div>}
                </Transition.Group>
                <Transition.Group animation="fade" duration={250}>
                    {this.state.show_customer_info && <CustomerInfo customer_info={this.state.customer_info}
                        stamps_subtracted={this.state.stamps_subtracted}
                        new_number_of_stamps={this.state.new_number_of_stamps}
                        add_a_stamp={this.add_a_stamp}
                        redeem_stamps={this.redeem_stamps}
                        redeem_value={this.state.redeem_value}
                        apply_stamps={this.apply_stamps}
                        show_customer_info={this.state.show_customer_info} />}
                </Transition.Group>
                <Transition.Group animation="fade" duration={250}>
                    {this.state.show_employee_management && <div>
                        <EmployeeManagement user_data={this.props.user_data}
                            socket={this.props.socket}
                            close_management_panel={this.close_management_panel} />
                    </div>}
                </Transition.Group>
            </div>
        );
    }
}
function CustomerInfo(props) {
    // TODO format dates to look nice
    return (
        <div>
            <Statistic color='red' size='huge' style={{ width: "100%" }}>
                <Statistic.Value>{props.new_number_of_stamps + props.customer_info.stamps}</Statistic.Value>
                <Statistic.Label>Current Stamps</Statistic.Label>
            </Statistic>
            <Grid columns={2}>
                <Grid.Row>
                    <Grid.Column>
                        <Button size='massive' onClick={props.redeem_stamps} disabled={props.stamps_subtracted || props.customer_info.stamps < props.redeem_value} fluid>{`Redeem ${props.redeem_value} Stamps`}</Button>
                    </Grid.Column>
                    <Grid.Column>
                        <Button size='massive' onClick={props.add_a_stamp} fluid>Add a Stamp</Button>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row centered columns={2}>
                    <Grid.Column>
                        <Statistic color='red' size='mini' style={{ width: "100%" }}>
                            <Statistic.Label>Last Visit</Statistic.Label>
                            <Statistic.Value text>{props.customer_info.last_visit ? props.customer_info.last_visit : "Never"}</Statistic.Value>
                        </Statistic>
                    </Grid.Column>
                    <Grid.Column>
                        <Statistic color='red' size='mini' style={{ width: "100%" }}>
                            <Statistic.Label>Visits Every</Statistic.Label>
                            <Statistic.Value text>{props.customer_info.average_days_between_visits ? `~${Math.round(props.customer_info.average_days_between_visits)} days` : "???"}</Statistic.Value>
                        </Statistic>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row centered columns={1}>
                    <Grid.Column>
                        <Statistic color='red' size='mini' style={{ width: "100%" }}>
                            <Statistic.Label>Customer Since</Statistic.Label>
                            <Statistic.Value text>{props.customer_info.customer_since}</Statistic.Value>
                        </Statistic>
                    </Grid.Column>
                </Grid.Row>
            </Grid>

            <Button size='massive' onClick={props.apply_stamps} fluid>Apply</Button>
        </div>
    );
}
export default EmployeeView;
