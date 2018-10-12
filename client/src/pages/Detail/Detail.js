import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";

class Detail extends Component {
  state = {
    ref: {}
  };

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
                <a href={this.state.ref.url}>{this.state.ref.url}</a>
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
