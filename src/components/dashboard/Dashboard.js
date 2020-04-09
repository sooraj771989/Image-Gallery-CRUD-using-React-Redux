import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Dashboard extends Component {
  render() {                                                        
    if(this.props.articles.length) {                                
      return (
        <div className="container flex flex-row py-10 px-10 flex-wrap">
          
          {this.props.articles.map(article => {                     
            return (
              <div className="w-full lg:w-4/12 mb-10 px-4" key={ article.id }>                              
              <img className="post-images" src={ article.img}></img>
              <p className="font-bold">{article.title}</p>
              <p className="text-sm">{article.content} </p>
            </div>
            );
          })}
        </div>
      )    
    } else {
      return (<div>No Images</div>)
    }
  }
}


const mapStateToProps = (state) => ({ articles: state.articles });  

export default connect(mapStateToProps)(Dashboard); 
 