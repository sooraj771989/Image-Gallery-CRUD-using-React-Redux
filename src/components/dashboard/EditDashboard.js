import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
class EditDashboard extends Component {
  render() {                                                        
    if(this.props.articles.length) {                                
      return (
        <React.Fragment>
        <div className="container flex flex-row py-10 px-10 flex-wrap padding-top-div">
        <div className="w-full  py-6 px-6 text-center text-2xl font-bold">
          Edit Image
        </div>
          {this.props.articles.map(article => {                     
            return (
              <React.Fragment>
              <div className="w-full lg:w-4/12 mb-10 px-4" key={article.id}>                              
              <div className="relative"  >
                    <img src={article.img} className="post-images" />
                  <div className="absolute bottom-0 left-0 hidden p-2 mb-5 ml-5 text-sm text-white bg-white caption md:block">
                    <p className="text-black">
                      {article.title}   </p>
                  </div>
                </div>
                <p className="text-sm mt-2 text-gray-600">{article.content} </p>
                <div className="btn-group mt-4">
              <Link to={`/articles/${article.id}`}  className='btn btn-info'>  
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