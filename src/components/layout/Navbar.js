import React, { Component } from "react";
import { BrowserRouter, Link, NavLink } from "react-router-dom";
import { logoutUser } from "../../actions/authActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
class Navbar extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
    render() {
      const { user } = this.props.auth;
      return (
        <div className="bg-white shadow container px-4">
            <div className="container mx-auto flex justify-between py-2 items-center">
              <Link
                to="/"
                style={{
                  fontFamily: "monospace"
                }}
                className="text-black px-4 py-4 font-bold text-black"
              >
                Image Gallery
              </Link>
              <div>
              <NavLink activeClassName="active" className="px-4" to="/login">
                Log In
              </NavLink>
              <NavLink activeClassName="active" className="px-4" to="/register">
               Register
              </NavLink>
              </div>
        </div>
        <div className="navbar-links container mx-auto flex flex-row py-2">
         <NavLink  exact to="/"  className="text-black px-4 py-4">Images</NavLink>
         <NavLink exact  to="/editdashboard"  className="text-black px-4 py-4">Edit Images</NavLink>
         <NavLink exact className="text-black px-4 py-4" to="/articles/new">Add New Image</NavLink>
        </div>        
        </div>
      );
    }
  }
  Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };
  const mapStateToProps = state => ({
    auth: state.auth
  });
  export default connect(mapStateToProps,{ logoutUser })(Navbar);