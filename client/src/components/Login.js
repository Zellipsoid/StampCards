import React from "react";
import "semantic-ui-css/semantic.min.css";
import {
  Button,
  Input,
  Grid,
  Transition,
  Select,
  Menu,
  Container,
  Message
} from "semantic-ui-react";
class Login extends React.Component {
  state = {
    visible: true,
    loading: false,
    username: "",
    password: "",
    confirm_password: "",
    show_create_new_account: false,
    show_login: true,
    username_exists: false,
    invalid_login: false,
    validation_errors: false,
    birth_day: "",
    birth_month: ""
  };
  constructor(props) {
    super(props);
    this.handle_change = this.handle_change.bind(this);
    props.socket.on("username_taken", () => {
      console.log("username taken!");
      this.setState({ username_exists: true, validation_errors: true })
    });
    props.socket.on("authentication_error", () => {
      console.log("invalid login!");
      this.setState({ invalid_login: true, validation_errors: true })
    });
  }

  handle_change = evt => {
    // check it out: we get the evt.target.name (which will be either "email" or "password")
    // and use it to target the key on our `state` object with the same name, using bracket syntax
    this.setState({ validation_errors: false });
    this.setState({ [evt.target.name]: evt.target.value });
  };
  handle_date_change = (e, { name, value }) => this.setState({ [name]: value, validation_errors: false });
  toggle_sign_up = () => {
    this.setState({ validation_errors: false });
    let moving_to_create_account;
    if (this.state.show_create_new_account) {
      moving_to_create_account = false;
    } else {
      moving_to_create_account = true;
    }
    this.setState({ show_create_new_account: false, show_login: false });
    if (!moving_to_create_account) {
      setTimeout(
        function () {
          this.setState({ show_login: !this.state.show_login });
        }.bind(this),
        500
      );
    } else {
      setTimeout(
        function () {
          this.setState({
            show_create_new_account: !this.state.show_create_new_account
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
    if (this.state.password !== this.state.confirm_password || this.state.password.length < 6 || this.state.birth_day === "" || this.state.birth_month === "" || this.state.username.length < 4) {
      this.setState({
        validation_errors: true,
        username_exists: false,
        invalid_login: false
      });
    } else {
      this.setState({
        validation_errors: false,
        username_exists: false,
        invalid_login: false
      });
      this.props.socket.emit("create_account", {
        username: this.state.username,
        password: this.state.password,
        birthday: `${
          this.state.birth_month < 10 ? "0" : ""
          }${this.state.birth_month.toString(10)}-${
          this.state.birth_day < 10 ? "0" : ""
          }${this.state.birth_day.toString(10)}`
      });
    }
  };
  messages = () => {
    let message_text = "";
    if (!this.state.validation_errors) {
      return (<div></div>);
    } else if (this.state.invalid_login) {
      message_text = "Your username or password is not recognized";
    } else if (this.state.password !== this.state.confirm_password) {
      message_text = "Passwords do not match";
    } else if (this.state.password.length < 6) {
      message_text = "Password must have at least 6 characters";
    } else if (this.state.birth_day === "" || this.state.birth_month === "") {
      message_text = "Please enter a valid birthday";
    } else if (this.state.username.length < 4) {
      message_text = "Username must have at least 4 characters";
    } else if (this.state.username_exists) {
      message_text = "This username is already taken";
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
  time_picker = () => {
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
              name="birth_month"
              compact
              onChange={this.handle_date_change}
            />
          </Menu.Menu>
          <Menu.Menu position="right">
            <Select
              placeholder="Day"
              options={days}
              name="birth_day"
              compact
              onChange={this.handle_date_change}
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
              onChange={this.handle_change}
              placeholder="Confirm Password"
              type="password"
            />
          </div>
        </div>
        <div className="niceMargins">
          <div className="row">{this.time_picker()}</div>
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
            <Button fluid onClick={this.toggle_sign_up}>
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
            <Button fluid onClick={this.toggle_sign_up}>
              Sign up
            </Button>
          </div>
        </div>
      </div>
    );
  };

  render() {
    const { show_create_new_account, show_login, validation_errors } = this.state;
    return (
      <Container>
        <div className="niceMargins">
          <Grid.Row>
            <Input
              fluid
              type="text"
              name="username"
              onChange={this.handle_change}
              placeholder="Username"
            />
          </Grid.Row>
        </div>
        <div className="niceMargins">
          <Grid.Row>
            <Input
              fluid
              name="password"
              onChange={this.handle_change}
              placeholder="Password"
              type="password"
            />
          </Grid.Row>
        </div>
        <Transition animation="fade right" duration={500} visible={show_login}>
          {this.normal()}
        </Transition>
        <Transition
          animation="fade left"
          duration={500}
          visible={show_create_new_account}
        >
          {this.create()}
        </Transition>
        <Transition animation="fade" duration={500} visible={validation_errors}>
          {this.messages()}
        </Transition>
      </Container>
    );
  }
}
export default Login;
