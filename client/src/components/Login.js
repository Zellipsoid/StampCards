import React from "react";
import "semantic-ui-css/semantic.min.css";
import {
  Button,
  Input,
  Grid,
  Transition,
  Select,
  Menu
} from "semantic-ui-react";
import { Message } from "semantic-ui-react";
import { Container } from "semantic-ui-react";
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
    username_exists: false,
    invalid_birthday: false,
    birthDay: "",
    birthMonth: ""
  };
  constructor(props) {
    super();
    this.handleChange = this.handleChange.bind(this);
    props.socket.on("username_taken", function() {
      console.log("username taken!");
    });
  }

  handleChange = evt => {
    // check it out: we get the evt.target.name (which will be either "email" or "password")
    // and use it to target the key on our `state` object with the same name, using bracket syntax
    this.setState({ [evt.target.name]: evt.target.value });
  };
  handleDateChange = (e, { name, value }) => this.setState({ [name]: value });
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
        function() {
          this.setState({ showLogin: !this.state.showLogin });
        }.bind(this),
        500
      );
    } else {
      setTimeout(
        function() {
          this.setState({
            showCreateNewAccount: !this.state.showCreateNewAccount
          });
        }.bind(this),
        500
      );
    }
  };
  login = () => {
    this.props.socket.emit("login", {
      username: this.state.username,
      password: this.state.password
    });
  };
  create_account = () => {
    if (this.state.password !== this.state.confirm_password) {
      this.setState({ password_mismatch: true, invalid_birthday: false });
    } else if (this.state.password.length < 6) {
      this.setState({
        password_too_short: true,
        password_mismatch: false,
        invalid_birthday: false
      });
    } else if (this.state.birthDay === "" || this.state.birthMonth === "") {
      this.setState({
        invalid_birthday: true,
        password_mismatch: false,
        password_too_short: false
      });
    } else {
      this.reset_message_states();
      this.props.socket.emit("create_account", {
        username: this.state.username,
        password: this.state.password,
        birthday: `${
          this.state.birthMonth < 10 ? "0" : ""
        }${this.state.birthMonth.toString(10)}-${
          this.state.birthDay < 10 ? "0" : ""
        }${this.state.birthDay.toString(10)}`
      });
    }
  };
  messages = () => {
    let message_text = "";
    if (this.state.password_mismatch) {
      message_text = "Passwords do not match";
    } else if (this.state.password_too_short) {
      message_text = "Password must have at least 6 characters";
    } else if (this.state.invalid_birthday) {
      message_text = "Please enter a valid birthday";
    } else {
      return;
    }
    return (
      <div className="niceMargins">
        <div className="row">
          <Message warning>
            <Message.Header>{message_text}</Message.Header>
            <p>Please try again.</p>
          </Message>
        </div>
      </div>
    );
  };
  reset_message_states = () => {
    this.setState({
      password_mismatch: false,
      password_too_short: false,
      invalid_login: false,
      username_exists: false
    });
  };
  timePicker = () => {
    const months = [
      { key: "Jan", text: "January", value: 1 },
      { key: "Feb", text: "February", value: 2 },
      { key: "Mar", text: "March", value: 3 },
      { key: "Apr", text: "April", value: 4 },
      { key: "May", text: "May", value: 5 },
      { key: "Jun", text: "June", value: 6 },
      { key: "Jul", text: "July", value: 7 },
      { key: "Aug", text: "August", value: 8 },
      { key: "Sep", text: "September", value: 9 },
      { key: "Oct", text: "October", value: 10 },
      { key: "Nov", text: "November", value: 11 },
      { key: "Dec", text: "December", value: 12 }
    ];
    const days = new Array(31).fill(undefined).map((x, i) => {
      let day = i + 1;
      return {
        key: day,
        text: day.toString(10),
        value: day
      };
    });
    return (
      <div>
        <Menu>
          <Menu.Item header>Birthday</Menu.Item>
          <Menu.Menu position="right">
            <Select
              placeholder="Month"
              options={months}
              name="birthMonth"
              compact
              onChange={this.handleDateChange}
            />
          </Menu.Menu>
          <Menu.Menu position="right">
            <Select
              placeholder="Day"
              options={days}
              name="birthDay"
              compact
              onChange={this.handleDateChange}
            />
          </Menu.Menu>
        </Menu>
      </div>
    );
  };
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
          <div className="row">{this.timePicker()}</div>
        </div>
        <div className="niceMargins">
          <div className="row">
            <Button fluid onClick={this.create_account}>
              Create Account
            </Button>
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
      <Container>
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
        </Transition>
        {this.messages()}
      </Container>
    );
  }
}
export default Login;
