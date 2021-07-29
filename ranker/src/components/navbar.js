import React, { Component } from 'react';

// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";

// We import NavLink to utilize the react router.
import { NavLink } from "react-router-dom";


export default class Navbar extends Component {

  render() {
    const bar = {
      "display": "inline-block",
      "float": "none",
      "vertical-align": "top",
      "text-align": "center"
    }

    return (
        <nav  class="navbar navbar-expand-lg  bg-light">
        <div style={bar} class="container-fluid">
        <h1 class="display-4">NBA Ranker - Who's Better?</h1>

            <ul style={{ "display": "inline-block", "float": "none"}} class="navbar-nav me-auto mb-2 mb-lg-0">
              <NavLink style={{"font-size": "25px"}}  to="/" className="navbar-brand">Vote</NavLink>
              <NavLink style={{"font-size": "25px"}}  to="/rankings" className="navbar-brand">Rankings</NavLink>  
            </ul>
            
          </div>
        </nav>
    );
  }
}