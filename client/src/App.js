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
    socket.on("userDataFromBackend", str => {
      console.log("Wooo!");
      console.log(str);
    });
  }
  // componentDidMount() {

  // }
  render() {
    return (
      <div className="center">
        <Login />
      </div>
    );
  }
}

export default App;
