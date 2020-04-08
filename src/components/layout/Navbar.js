import React, { Component } from "react";
import { BrowserRouter, Link } from "react-router-dom";
class Navbar extends Component {
    render() {
      return (
        <BrowserRouter>
        <div className="navbar-fixed">
          <nav className="z-depth-0">
            <div className="nav-wrapper white">
              <Link
                to="/"
                style={{
                  fontFamily: "monospace"
                }}
                className="col s5 brand-logo center black-text"
              >
                <i className="material-icons">code</i>
                Image Gallery
              </Link>
            </div>
          </nav>
        </div>
        </BrowserRouter>
      );
    }
  }
  export default Navbar;