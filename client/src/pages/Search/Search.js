import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, Checkbox, FormBtn } from "../../components/Form";

class Search extends Component {
  state= {
    refs: [],
    search: ""
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.search) {
      API.searchRefs({
        search: this.state.search
      })
        .then(res => this.setState({refs: res.data, search: ""}))
        .catch(err => console.log(err));
    }
  };

  render() {
    return(
      <Container fluid>
        <Row>
        <Col size="md-2">
        </Col>
        <Col size="md-8">
          <Jumbotron>
            <h1>Search</h1>
          </Jumbotron>
          <form>
            <Input
              value={this.state.search}
              onChange={this.handleInputChange}
              name="search"
            />
            <FormBtn
              disabled={!(this.state.search)}
              onClick={this.handleFormSubmit}
            >
              Search
            </FormBtn>
          </form>
          {this.state.refs.length ? (
            <List>
              {this.state.refs.map(ref => (
                <ListItem key={ref._id}> 
                  <strong>
                  <Link to={"/refs/" + ref._id}>{ref.title}<br/></Link> 
                    <a href={ref.url}>{ref.url}</a>
                  </strong>
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

export default Search;