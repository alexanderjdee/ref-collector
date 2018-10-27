import React from "react";
import { Link } from "react-router-dom";

const Nav = () => (
  <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-info">
    <a className="navbar-brand" href="/">
      Home
    </a>
    <form className="form-inline my-2 my-lg-0 ml-auto nav-buttons">
      <Link to={"/search"}><button className="btn btn-outline-success mr-2 my-sm-0">Search</button></Link>
    </form>
  </nav>
);

export default Nav;
