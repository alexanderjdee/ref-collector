import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, Checkbox, FormBtn } from "../../components/Form";
import Timestamp from 'react-timestamp';
import './Refs.css';

import { getFromStorage, setInStorage } from '../../utils/storage'

class Refs extends Component {
  state = {
    refs: [],
    title: "",
    url: "",
    private: false,
    isLoading: true,
    token: '',
    signInUsername: '',
    signInPassword: '',
    signUpUsername: '',
    signUpPassword: ''
  };

  componentDidMount() {
    const obj = getFromStorage('the_main_app');
    if(obj) {
      const { token } = obj;
      fetch('/api/account/verify?token=' + token)
      .then(res => res.json())
      .then(json => {
        if(json.success){
          this.setState({
            token,
            isLoading: false
          });
        } else {
          this.setState({
            isLoading: false
          });
        }
      });
    } else {
      this.setState({
        isLoading: false
      })
    }
    this.loadRefs();
  }

  resetUserState = () => {
    this.setState({
      isLoading: false,
      signInUsername: '',
      signInPassword: '',
      signUpUsername: '',
      signUpPassword: '' 
    });
  }

  loadRefs = () => {
    API.getRefs()
      .then(res => {
        this.setState({ 
        refs: res.data, 
        title: "", 
        url: "", 
        private: false, 
        });
      })
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

  handleCheckboxChange = event => {
    const {name, checked} = event.target;
    this.setState({
      [name]: checked
    });
  }

  handleRefsFormSubmit = event => {
    event.preventDefault();
    if (this.state.title && this.state.url) {
      API.saveRef({
        title: this.state.title,
        url: this.state.url,
        private: this.state.private
      })
        .then(res => this.loadRefs())
        .catch(err => console.log(err));
    }
  };

  handleSignUpFormSubmit = event => {
    event.preventDefault();
    this.setState({
      isLoading: true
    });
    API.signUp({
      username: this.state.signUpUsername,
      password: this.state.signUpPassword
    }).then(res => {
      API.signIn({
        username: this.state.signUpUsername,
        password: this.state.signUpPassword
      }).then(res => {
        setInStorage('the_main_app', { token: res.data.token });
        this.resetUserState();
        this.setState({ token: res.data.token});
      })
    })
      .catch(err => console.log(err));
  };

  handleSignInFormSubmit = event => {
    event.preventDefault();
    this.setState({
      isLoading: true
    });
    API.signIn({
      username: this.state.signInUsername,
      password: this.state.signInPassword
    }).then(res => {
      setInStorage('the_main_app', { token: res.data.token });
      this.resetUserState();
      this.setState({ token: res.data.token});
    })
      .catch(err => console.log(err));
  };

  handleLogout = event => {
    event.preventDefault();

    this.setState({
      isLoading: true
    });
    const obj = getFromStorage('the_main_app');
    if(obj) {
      const { token } = obj;
      fetch('/api/account/logout?token=' + token)
      .then(res => res.json())
      .then(json => {
        if(json.success){
          this.setState({
            token: '',
            isLoading: false
          });
        } else {
          this.setState({
            isLoading: false
          });
        }
      });
    } else {
      this.setState({
        isLoading: false
      });
    }

  }

  render() {
    const { 
      isLoading,
      token,
      signInUsername,
      signInPassword,
      signUpUsername,
      signUpPassword 
    } = this.state;
    if(isLoading) {
      return (<div><p>Loading...</p></div>);
    }

    if(!token){
      return (
        <div className="container centered">
          <div>
            <h1>Sign In</h1>
            <Input
              value={signInUsername}
              onChange={this.handleInputChange}
              name="signInUsername"
              placeholder="Username"
              label="Sign In"
            />
            <Input
              value={signInPassword}
              onChange={this.handleInputChange}
              name="signInPassword"
              placeholder="Password"
            />
            <FormBtn
              disabled={!(this.state.signInUsername && this.state.signInPassword)}
              onClick={this.handleSignInFormSubmit}
            >
              Sign In
            </FormBtn>
          </div>
          <div className="space-top">
            <h1>Sign Up</h1>
            <Input
              value={signUpUsername}
              onChange={this.handleInputChange}
              name="signUpUsername"
              placeholder="Username"
            />
            <Input
              value={signUpPassword}
              onChange={this.handleInputChange}
              name="signUpPassword"
              placeholder="Password"
            />
            <FormBtn
              disabled={!(this.state.signUpUsername && this.state.signUpPassword)}
              onClick={this.handleSignUpFormSubmit}
            >
              Sign Up
            </FormBtn>
          </div>
        </div>
      );
    }

    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>Add new ref</h1>
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
              <Checkbox
                checked={this.state.private}
                onChange={this.handleCheckboxChange}
                name="private"
              />
              <FormBtn
                disabled={!(this.state.title && this.state.url)}
                onClick={this.handleRefsFormSubmit}
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
                        <a href={ref.url} target="_blank">{ref.url}</a><br/>
                        <Timestamp time={ref.date} precision={2} />
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
        <Row>
        <nav className="navbar fixed-bottom navbar-expand-lg navbar-dark bg-info">
          <button onClick={this.handleLogout} style={{ float: "left", marginBottom: 5 }} className="btn btn-success">
            Logout
          </button>
        </nav>
        </Row>
      </Container>
    );
  }
}

export default Refs;
