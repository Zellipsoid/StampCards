import React, { Component } from "react";
import { Transition } from 'semantic-ui-react'
import "../App.css";
import Confetti from 'react-confetti'

class HappyBirthday extends Component {
    state = { birthday: false }
    componentDidMount() {
        let today = new Date().toISOString();
        let is_birthday = false;
        if (today.substring(5, 10) === this.props.user_data.birthday) {
            is_birthday = true;
        }
        console.log(`${today.substring(5, 10)} ==? ${this.props.user_data.birthday}`);
        this.setState({ birthday: is_birthday });
    }

    close_birthday = () => {
        this.setState({ birthday: false })
    }

    render() {
        return (
            <div>
                <Transition.Group visible={this.state.birthday} animation='scale' duration={100}>
                    {this.state.birthday && <Confetti onClick={this.close_birthday} />}
                </Transition.Group>
            </div>
        );
    }
}

export default HappyBirthday;
