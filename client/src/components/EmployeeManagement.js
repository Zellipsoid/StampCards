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
    render() {
        return (
            <div>
                <Input fluid action='Add to Roster' placeholder='Username' />
                <TableRow employees={this.state.employees} />
                <Button onClick={this.props.close_management_panel} attached="bottom" fluid>Back to Scanner</Button>
            </div>
        );
    }
}
function TableRow(props) {
    const employees = props.employees;
    const employee_array = employees.map(employee =>
        <Table.Row>
            <Table.Cell>{employee['0']}</Table.Cell> {/*username*/}
            <Table.Cell collapsing>
                <Checkbox toggle label="Manager" />
            </Table.Cell>
            <Table.Cell collapsing>
                <Button>Remove Employee</Button>
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
