 import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
class EditDashboard extends Component {
  render() {                                                        
    if(this.props.articles.length) {                                
      return (
        <React.Fragment>
        <div className="container py-6 px-6 text-center font-bold">
          Edit Image
        </div>
        <div className="container flex flex-row py-10 px-10 flex-wrap">
          {this.props.articles.map(article => {                     
            return (
              <React.Fragment>
              <div  className="w-full lg:w-4/12 mb-4 px-4" key={ article.id }>                              
              <Link to={`/articles/${article.id}`}>
                <img className="post-images" src={ article.img}></img>
                </Link>
                <p className="font-bold mt-2">{article.title}</p>
                <p className="text-sm">{article.content} </p>
                <div className="btn-group mt-4">
              <Link to={{ pathname: `/articles/${article.id}/edit`, state: { article: article } }} className='btn btn-info'>  
                Edit
              </Link>
            </div>
                </div>
              </React.Fragment>
            );
          })}
        </div>
         </React.Fragment>
      )    
    } else {
      return (<div>No Articles</div>)
    }
  }
}
const mapStateToProps = (state) => ({ articles: state.articles });  
export default connect(mapStateToProps)(EditDashboard); 