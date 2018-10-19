import React, { Component } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";

class Login extends Component {
  render() {
    return (
      <Container fluid>
        <Row>
          <h1 className="login-center">
            Login Using Google
          </h1>
        </Row>
        <Row>
          <a href="http://localhost:3001/api/auth-routes/auth/google" className="login-center"><button className="btn btn-outline-primary" id="google-button">
            Google+
          </button></a>
        </Row>
      </Container>
    );
  }
}

export default Login;