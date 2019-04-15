import React, { Component } from "react";
import { Button, Table, Checkbox, Icon } from 'semantic-ui-react'
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
                <Table celled compact definition>
                    <Table.Header fullWidth>
                        <Table.Row>
                            <Table.HeaderCell>Employees</Table.HeaderCell>
                            {/* <Table.HeaderCell>Manager</Table.HeaderCell> */}
                            {/* <Table.HeaderCell>Date Started</Table.HeaderCell> */}
                            {/* <Table.HeaderCell>Remove</Table.HeaderCell> */}
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        <TableRow employees={this.state.employees} />



                        {/* <Table.Row>
                            <Table.Cell collapsing>
                                <Checkbox slider />
                            </Table.Cell>
                            <Table.Cell>Jamie Harington</Table.Cell>
                            <Table.Cell>January 11, 2014</Table.Cell>
                            <Table.Cell>jamieharingonton@yahoo.com</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell collapsing>
                                <Checkbox slider />
                            </Table.Cell>
                            <Table.Cell>Jill Lewis</Table.Cell>
                            <Table.Cell>May 11, 2014</Table.Cell>
                            <Table.Cell>jilsewris22@yahoo.com</Table.Cell>
                        </Table.Row> */}
                    </Table.Body>

                    {/* <Table.Footer fullWidth>
                        <Table.Row>
                            <Table.HeaderCell />
                            <Table.HeaderCell colSpan='4'>
                                <Button floated='right' icon labelPosition='left' primary size='small'>
                                    <Icon name='user' /> Add User
          </Button>
                                <Button size='small'>Approve</Button>
                                <Button disabled size='small'>
                                    Approve All
          </Button>
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Footer> */}
                </Table>
                <Button onClick={this.props.close_management_panel} attached="bottom" fluid>Back to Scanner</Button>
                {/* </Modal> */}
            </div>
        );
    }
}
function TableRow(props) {
    let employees = props.employees;
    let employee_array = employees.map(employee =>
        <Table.Row>
            <Table.Cell collapsing>
                <Checkbox slider />
            </Table.Cell>
            <Table.Cell>{employee.username}</Table.Cell>
            <Table.Cell>{employee.date_started}</Table.Cell>
            <Table.Cell collapsing>
                <Checkbox slider />
            </Table.Cell>
            <Table.Cell collapsing>
                <Button>Remove</Button>
            </Table.Cell>
        </Table.Row>
    )
    return (
        { employee_array }
    );
}
export default EmployeeManagement;
