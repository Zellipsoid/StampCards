import React, { Component } from "react";
import { Button, Table, Checkbox, Input } from 'semantic-ui-react'
import "../App.css";
// import {
//   Transition
// } from "semantic-ui-react";

class EmployeeManagement extends Component {
    state = {
        employees: []
    }
    constructor(props) {
        super(props);
        props.socket.on("employee_table", (data) => {
            console.log('got employee table info!')
            // console.log(data);
            this.setState({ employees: data });
        });
    }
    componentDidMount() {
        console.log('mounted table!')
        this.props.socket.emit("get_employees", {
            username_requesting: this.props.user_data.username
        });
    }
    getEmployeeStatus = (username) => {
        let user = this.state.employees.filter(obj => {
            return obj['0'] === username;
        })
        if (user['1'] == 3 || user['1'] == 2) {
            console.log(`${username} is manager`)
            return true;
        }
        else {
            console.log(`${username} is not manager`)
            return false;
        }
    }
    changeEmployeeStatus = (username) => {
        console.log(username);
        let user = this.state.employees.filter(obj => {
            return obj['0'] === username;
        })
        if (user['1'] === 1) {
            user['1'] = 2;
        } else if (user['1'] === 2) {
            user['1'] = 1;
        }
    }
    render() {
        return (
            <div>
                <Input fluid action='Add to Roster' placeholder='Username' />
                <EmployeeTable employees={this.state.employees} getEmployeeStatus={this.getEmployeeStatus} changeEmployeeStatus={this.changeEmployeeStatus} />
                <Button onClick={this.props.close_management_panel} attached="bottom" fluid>Back to Scanner</Button>
            </div>
        );
    }

}
function EmployeeTable(props) {
    const employees = props.employees;
    const employee_array = employees.map(employee =>
        <Table.Row key={employee['0']}>
            <Table.Cell>{employee['0']}</Table.Cell> {/*username*/}
            <Table.Cell collapsing>
                <Checkbox toggle label="Manager" onChange={props.changeEmployeeStatus(employee['0'])} checked={props.getEmployeeStatus(employee['0'])} disabled={employee['1'] === 3} />
            </Table.Cell>
            <Table.Cell collapsing>
                <Button disabled={employee['1'] === 3} >Remove Employee</Button>
            </Table.Cell>
        </Table.Row>
    )
    return (
        <Table celled compact definition>
            <Table.Header fullWidth>
                <Table.Row>
                    <Table.HeaderCell>Employees</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {employee_array}
            </Table.Body>
        </Table>
    );
}
export default EmployeeManagement;
