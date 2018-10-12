import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";

class Refs extends Component {
  state = {
    refs: [],
    title: "",
    url: ""
  };

  componentDidMount() {
    this.loadRefs();
  }

  loadRefs = () => {
    API.getRefs()
      .then(res =>
        this.setState({ refs: res.data, title: "", url: "" })
      )
      .catch(err => console.log(err));
  };

  deleteRef = id => {
    API.deleteRef(id)
      .then(res => this.loadRefs())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title && this.state.url) {
      API.saveRef({
        title: this.state.title,
        author: this.state.author,
        synopsis: this.state.synopsis
      })
        .then(res => this.loadRefs())
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>What Refs Should I See?</h1>
            </Jumbotron>
            <form>
              <Input
                value={this.state.title}
                onChange={this.handleInputChange}
                name="title"
                placeholder="Title (required)"
              />
              <Input
                value={this.state.url}
                onChange={this.handleInputChange}
                name="url"
                placeholder="URL (required)"
              />
              <FormBtn
                disabled={!(this.state.author && this.state.url)}
                onClick={this.handleFormSubmit}
              >
                Submit Ref
              </FormBtn>
            </form>
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Refs On My List</h1>
            </Jumbotron>
            {this.state.refs.length ? (
              <List>
                {this.state.refs.map(ref => (
                  <ListItem key={ref._id}>
                    
                      <strong>
                      <Link to={"/refs/" + ref._id}>{ref.title}<br/></Link> 
                        <a href={ref.url}>{ref.url}</a>
                      </strong>
                    
                    <DeleteBtn onClick={() => this.deleteRef(ref._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Refs;
