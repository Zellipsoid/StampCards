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
            return obj[0] === username;
        })[0]
        console.log(user);
        console.log(user[1]);
        console.log(typeof user[1]);
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
        console.log(username);
        // clone an array
        // let employees_clone = JSON.parse(JSON.stringify(this.state.employees));
        // let user = this.state.employees.filter(obj => {
        //     return obj[0] === username;
        // })[0]
        // if (user['1'] === 1) {
        //     user['1'] = 2;
        // } else if (user['1'] === 2) {
        //     user['1'] = 1;
        // }
        // this.setState({ employees: employees_clone });
        let new_rank = 0;
        if (rank === 1) {
            new_rank = 2;
        } else if (rank === 2) {
            new_rank = 1;
        }
        this.props.socket.emit("update_employee_rank", { username_requesting: this.props.user_data.username, username_to_change: username, new_rank: new_rank })
    }
    remove_employee = (username) => {
        console.log(`removing ${username}`);
    }
    render() {
        return (
            <div>
                <Input fluid action='Add to Roster' placeholder='Username' />
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
                <Button onChange={props.remove_employee} disabled={employee['1'] === 3} >Remove Employee</Button>
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
