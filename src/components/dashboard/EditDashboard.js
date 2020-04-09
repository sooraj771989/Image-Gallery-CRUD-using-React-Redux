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
              <div className="relative post-image-div"  >
                    <img src={article.img} className="dashboard-post-image post-images" />
                  <div className="absolute middle bottom-0 left-0 hidden p-2 mb-5 ml-5 text-sm caption md:block">
                    <p className="text-gray-200">
                      {article.author}   </p>
                  </div>
                </div>
                <div className="btn-group mt-4">
              <Link to={`/post/${article.id}`}  className='btn btn-info'>  
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