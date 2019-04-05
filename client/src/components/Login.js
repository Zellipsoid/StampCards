import React from "react";
import "semantic-ui-css/semantic.min.css";
// import "./App.css";
import { Button, Input, Grid, Transition } from "semantic-ui-react";
import { Message } from 'semantic-ui-react'
// import openSocket from "socket.io-client";
// const socket = openSocket("https://zellipsoid.ngrok.io");
// const io = require("socket.io-client");
// const socket = io.connect("https://zellipsoid.ngrok.io");

class Login extends React.Component {
  state = {
    visible: true,
    loading: false,
    username: "",
    password: "",
    confirm_password: "",
    showCreateNewAccount: false,
    showLogin: true,
    password_mismatch: false,
    password_too_short: false,
    invalid_login: false,
    username_exists: false
  };
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange = evt => {
    // check it out: we get the evt.target.name (which will be either "email" or "password")
    // and use it to target the key on our `state` object with the same name, using bracket syntax
    this.setState({ [evt.target.name]: evt.target.value });
  };
  toggleSignUp = () => {
    this.reset_message_states();
    let movingToCreateAccount;
    if (this.state.showCreateNewAccount) {
      movingToCreateAccount = false;
    } else {
      movingToCreateAccount = true;
    }
    this.setState({ showCreateNewAccount: false, showLogin: false });
    if (!movingToCreateAccount) {
      setTimeout(
        function () {
          this.setState({ showLogin: !this.state.showLogin });
        }.bind(this),
        500
      );
    } else {
      setTimeout(
        function () {
          this.setState({
            showCreateNewAccount: !this.state.showCreateNewAccount
          });
        }.bind(this),
        500
      );
    }
  };
  login = () => {
    this.props.socket.emit("login", { username: this.state.username, password: this.state.password });
  };
  create_account = () => {
    if (this.state.password !== this.state.confirm_password) {

      this.setState({ password_mismatch: true });
    }
    else if (this.state.password.length < 6) {
      this.setState({ password_too_short: true });
    }
    else {
      this.reset_message_states();
      this.props.socket.emit("create_account", { username: this.state.username, password: this.state.password });
    }
  };
  messages = () => {
    let message_text = "";
    if (this.state.password_mismatch) {
      message_text = "Passwords do not match";
    }
    else if (this.state.password_too_short) {
      message_text = "Password must have at least 6 characters";
    } else {
      return;
    }
    return (
      <div className="niceMargins">
        <div className="row">
          <Message warning>
            <Message.Header>{message_text}</Message.Header>
          </Message>
        </div>
      </div>
    );
  }
  reset_message_states = () => {
    this.setState({ password_mismatch: false, password_too_short: false, invalid_login: false, username_exists: false });
  }
  create = () => {
    return (
      <div>
        <div className="niceMargins">
          <div className="row">
            <Input
              fluid
              name="confirm_password"
              onChange={this.handleChange}
              placeholder="Confirm Password"
              type="password"
            />
          </div>
        </div>
        <div className="niceMargins">
          <div className="row">
            <Button fluid onClick={this.create_account}>Create Account</Button>
          </div>
        </div>
        <div className="niceMargins">
          <div className="row">
            <Button fluid onClick={this.toggleSignUp}>
              Back to login
            </Button>
          </div>
        </div>
      </div>
    );
  };
  normal = () => {
    return (
      <div>
        <div className="niceMargins">
          <div className="row">
            <Button fluid onClick={this.login}>
              Login
            </Button>
          </div>
        </div>

        <div className="niceMargins">
          <div className="row">
            <Button fluid onClick={this.toggleSignUp}>
              Sign up
            </Button>
          </div>
        </div>
      </div>
    );
  };

  render() {
    const { showCreateNewAccount, showLogin } = this.state;
    return (
      <div className="ui container">
        <div className="niceMargins">
          <Grid.Row>
            <Input
              fluid
              type="text"
              name="username"
              onChange={this.handleChange}
              placeholder="Username"
            />
          </Grid.Row>
        </div>
        <div className="niceMargins">
          <Grid.Row>
            <Input
              fluid
              name="password"
              onChange={this.handleChange}
              placeholder="Password"
              type="password"
            />
          </Grid.Row>
        </div>
        <Transition animation="fade right" duration={500} visible={showLogin}>
          {this.normal()}
        </Transition>
        <Transition
          animation="fade left"
          duration={500}
          visible={showCreateNewAccount}
        >
          {this.create()}
          {this.messages()}
        </Transition>
      </div>
    );
  }
}
export default Login;
