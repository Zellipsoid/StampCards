import React, { Component } from "react";
import { Card, Statistic, Transition, Grid, Button } from 'semantic-ui-react'
import "../App.css";
// import {
//   Transition
// } from "semantic-ui-react";

class EmployeeManagement extends Component {
    state = {}
    constructor(props) {
        super(props);
        props.socket.on("employee_table", (data) => {
            console.log('got employee table info!')
        });
    }
    componentDidMount() {
        console.log('mounted table!')
    }
    render() {
        return (
            <div>
                <Modal.Header>Delete Your Account</Modal.Header>
                <Modal.Content>
                    <p>Are you sure you want to delete your account</p>
                </Modal.Content>
                <Modal.Actions>
                    <Button negative>No</Button>
                    <Button positive icon='checkmark' labelPosition='right' content='Yes' />
                </Modal.Actions>
            </div>
        );
    }
}
export default EmployeeManagement;
