import React, { Component } from "react";
import "./App.css";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
// const io = require("socket.io-client");
// const socket = io.connect("https://zellipsoid.ngrok.io");
import openSocket from "socket.io-client";
import "semantic-ui-css/semantic.min.css";
import {
  Transition
} from "semantic-ui-react";
const socket = openSocket("https://zellipsoid.ngrok.io");

class App extends Component {
  state = {
    authenticated: false,
    show_dashboard: false,
    user_data: {}
  }
  constructor() {
    super();
    socket.on("authentication_successful", (data) => {
      console.log(`User received:`);
      console.log(data);
      this.state.user_data = data;
      this.open_dashboard();
    });
    socket.on("refresh_user_data", (data) => {
      console.log(`User refreshed:`);
      console.log(data);
      this.setState({ user_data: data });
    });
  }
  open_dashboard = () => {
    this.setState({
      authenticated: true
    });
    setTimeout(
      function () {
        this.setState({
          show_dashboard: true
        });
      }.bind(this),
      500
    );
  };
  // componentDidMount() {

  // }
  render() {
    return (
      <div>
        <Transition animation="fade" duration={500} visible={!this.state.authenticated}>
          <div className="center">
            <Login socket={socket} />
          </div>
        </Transition>
        <Transition animation="fade" duration={500} visible={this.state.show_dashboard}>
          <div className="center">
            <Dashboard socket={socket} user_data={this.state.user_data} />
          </div>
        </Transition>
      </div>
    );
  }
}

export default App;
