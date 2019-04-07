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
    username: ""
  }
  constructor() {
    super();
    socket.on("authentication_successful", (data) => {
      console.log(`logging in as ${data.username}!`);
      this.state.username = data.username;
      this.open_dashboard();
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
            <Dashboard socket={socket} username={this.state.username} />
          </div>
        </Transition>
      </div>
    );
  }
}

export default App;
