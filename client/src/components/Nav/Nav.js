import React from "react";
import { Link } from "react-router-dom";
import API from "../../utils/API";
import "./Nav.css"

const Nav = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-info">
    <a className="navbar-brand" href="/">
      Home
    </a>
    <form className="form-inline my-2 my-lg-0 nav-buttons">
      <Link to={"/search"}><button className="btn btn-outline-success mr-2 my-sm-0">Search</button></Link>
      <Link to={"/auth/login"}><button className="btn btn-outline-light mr-2 my-sm-0">Sign In</button></Link>
      <button className="btn btn-outline-light mr-2 my-sm-0" onClick={API.logout}>Log Out</button>
      <button className="btn btn-outline-light mr-2 my-sm-0" type="submit">Register</button>
    </form>
  </nav>
);

export default Nav;
