import React, { Component } from "react";
import "./App.css";
import Login from "./components/Login";
// const io = require("socket.io-client");
// const socket = io.connect("https://zellipsoid.ngrok.io");
import openSocket from "socket.io-client";
const socket = openSocket("https://zellipsoid.ngrok.io");

class App extends Component {
  constructor() {
    super();
    socket.on("userDataFromBackend", function(str) {
      console.log("Wooo!");
      console.log(str);
    });
    socket.on("logged_in", function(data) {
      console.log(`logging in as ${data}!`);
    });
  }
  // componentDidMount() {

  // }
  render() {
    return (
      <div className="center">
        <Login socket={socket} />
      </div>
    );
  }
}

export default App;
