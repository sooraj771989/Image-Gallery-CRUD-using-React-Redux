import React, { Component } from "react";
import { BrowserRouter, Link } from "react-router-dom";
class Navbar extends Component {
    render() {
      return (
        <BrowserRouter>
        <div className="bg-white shadow ">
 
            <div className="container mx-auto flex justify-between py-4">
              <Link
                to="/"
                style={{
                  fontFamily: "monospace"
                }}
                className="font-bold text-black"
              >
                Image Gallery
              </Link>

              <div> Login </div>
             
           
        </div>

        <div className="container mx-auto  py-4">
         <div className="flex flex-row">
           Images
           Edit Images
         </div>
        </div>        



        </div>
        </BrowserRouter>
      );
    }
  }
  export default Navbar;