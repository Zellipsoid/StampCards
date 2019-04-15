import React, { Component } from "react";
import { Button, Table, Checkbox, Input, Transition } from 'semantic-ui-react'
import "../App.css";
// import {
//   Transition
// } from "semantic-ui-react";

class EmployeeManagement extends Component {
    state = {
        employees: [],
        employee_to_create: ""
    }
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
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
    handleChange = evt => {
        // check it out: we get the evt.target.name (which will be either "email" or "password")
        // and use it to target the key on our `state` object with the same name, using bracket syntax
        this.setState({ validation_errors: false });
        this.setState({ [evt.target.name]: evt.target.value });
    };
    getEmployeeStatus = (username) => {
        let user = this.state.employees.filter(obj => {
            return obj[0] === username;
        })[0];
        if (user[1] == 3 || user[1] == 2) {
            console.log(`${username} is manager`)
            return true;
        }
        else {
            console.log(`${username} is not manager`)
            return false;
        }
    }
    changeEmployeeStatus = (username, rank) => {
        console.log(`changing rank of ${username}`);
        let new_rank = 0;
        if (rank === 1) {
            new_rank = 2;
        } else if (rank === 2) {
            new_rank = 1;
        }
        this.props.socket.emit("update_employee_rank", { username_requesting: this.props.user_data.username, username_to_change: username, new_rank: new_rank });
    }
    remove_employee = (username) => {
        console.log(`removing ${username}`);
        this.props.socket.emit("delete_employee", { username_requesting: this.props.user_data.username, username_to_delete: username });
    }
    add_employee = () => {
        console.log(`adding ${this.state.employee_to_create}`);
        this.props.socket.emit("add_employee", { username_requesting: this.props.user_data.username, employee_to_create: this.state.employee_to_create });
    }
    render() {
        return (
            <div>
                <Input fluid action={{ content: 'Add to Roster', onClick: this.add_employee }} placeholder='Username' onChange={this.handleChange} name="employee_to_create" />
                <EmployeeTable employees={this.state.employees} getEmployeeStatus={this.getEmployeeStatus} changeEmployeeStatus={this.changeEmployeeStatus} remove_employee={this.remove_employee} user_data={this.props.user_data} />
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
                <Checkbox toggle label="Manager" onClick={() => { props.changeEmployeeStatus(employee['0'], employee['1']) }} checked={props.getEmployeeStatus(employee['0'])} disabled={employee['1'] === 3 || employee['0'] === props.user_data.username} />
            </Table.Cell>
            <Table.Cell collapsing>
                <Button onClick={() => { props.remove_employee(employee['0']) }} disabled={employee['1'] === 3 || employee['0'] === props.user_data.username} icon='trash'></Button>
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
            <Transition.Group as={Table.Body}>
                {employee_array}
            </Transition.Group>
        </Table>
    );
}
export default EmployeeManagement;
