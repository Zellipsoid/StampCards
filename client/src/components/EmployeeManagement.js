import React, { Component } from "react";
import { Button, Modal } from 'semantic-ui-react'
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
                {/* <Modal size="fullscreen"
                    trigger={<Button onClick={this.toggleManagementPanel} attached="bottom">Open Employee Management</Button>}
                    open={this.state.show_employee_management}
                    onClose={this.toggleManagementPanel}
                    size="fullscreen">
                    <Modal.Header>Delete Your Account</Modal.Header>
                    <Modal.Content>
                        <p>Are you sure you want to delete your account</p>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button negative onClick={this.props.toggleManagementPanel}>No</Button>
                        <Button positive icon='checkmark' labelPosition='right' content='Yes' onClick={this.props.toggleManagementPanel} />
                    </Modal.Actions> */}
                <p>Hello</p>
                <Button onClick={this.props.close_management_panel} attached="bottom" fluid>Back to Scanner</Button>
                {/* </Modal> */}
            </div>
        );
    }
}
export default EmployeeManagement;
