import React, { Component } from "react";
import { BrowserRouter, Link, NavLink } from "react-router-dom";
import { logoutUser } from "../../actions/authActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
class Header extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
    render() {
      const { user } = this.props.auth;
      return (
        <div className="fixed bg-white shadow container px-4 z-10">
            <div className="container mx-auto flex justify-between px-2 items-center">
              <Link
                to="/"
                 className="text-black px-4 py-4 font-bold flex items-center text-black"
              >
                 <svg version="1.1" viewBox="0 0 32 32" width="32" height="32" aria-labelledby="unsplash-home" aria-hidden="false"><title id="unsplash-home">Unsplash Home</title><path d="M10 9V0h12v9H10zm12 5h10v18H0V14h10v9h12v-9z"></path></svg>
                 <div className="ml-2 flex flex-col">
                   <span className=" ">Unsplash</span>
                   <span className=" ">Photos for everyone</span>
                   </div> 
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
        <div className="navbar-links container mx-auto flex flex-row px-2">
         <NavLink  exact to="/"  className="text-black px-4 py-4">Images</NavLink>
         <NavLink exact  to="/editdashboard"  className="text-black px-4 py-4">Edit Images</NavLink>
         
        </div>        
        </div>
      );
    }
  }
  Header.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };
  const mapStateToProps = state => ({
    auth: state.auth
  });
  export default connect(mapStateToProps,{ logoutUser })(Header);