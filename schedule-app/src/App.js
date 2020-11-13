import React, { Component } from "react";
import "./App.css";
import NavbarContainer from "./components/NavbarContainer";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  callAPI() {
    fetch("http://localhost:9000/testAPI")
      .then((res) => res.text())
      .then((res) => this.setState({ apiResponse: res }));
  }

  componentWillMount() {
    this.callAPI();
  }
  render() {
    return (
      <NavbarContainer></NavbarContainer>
      //<p>{this.state.apiResponse.item}</p>
    );
  }
}
export default App;
