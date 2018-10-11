import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";

class Detail extends Component {
  state = {
    ref: {}
  };
  // Add code to get the ref with an _id equal to the id in the route param
  // e.g. http://localhost:3000/refs/:id
  // The ref id for this route can be accessed using this.props.match.params.id

  componentDidMount() {
    API.getRef(this.props.match.params.id)
      .then(res => this.setState({ref: res.data}))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>
                {this.state.ref.title}<br/>
                {this.state.ref.url}
              </h1>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col size="md-2">
            <Link to="/">← Back to Reflist</Link>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Detail;
