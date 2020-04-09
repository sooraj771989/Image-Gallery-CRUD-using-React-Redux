import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getArticle, deleteArticle } from './../../actions/index';    

class InfoPost extends Component {
  componentDidMount() {                                                         
    this.props.getArticle(this.props.match.params.id);
  }

  render() {
    const article = this.props.article;
    return (
      <div className="w-full py-16 mx-auto padding-top-div">
      <div className="justify-center flex flex-col mx-auto w-full lg:w-6/12 mx-auto"> 
 
        <div>
          <img className="post-edit-image" src={article.img}></img>
          </div>
        <h2 className="font-bold mt-6">{article.title}</h2>
        <p className="text-gray-600 mt-4">{article.content}</p>
        <p className="text-gray-600 mt-4"><span className="text-black font-bold">Uploaded By: </span> {article.author}</p>
        <div className="btn-group mt-4 mb-4">
          <Link to={{ pathname: `/post/${article.id}/edit`, state: { article: article } }} className='btn btn-info mr-4 '>  
            Edit
          </Link>
          <button className="btn btn-danger mr-4 " type="button" onClick={() => this.props.deleteArticle(article.id)}>          
            Delete
          </button>
          <Link to="/editdashboard" className="btn btn-primary mr-4 ">Close</Link>                                                 
        </div>
        </div>
    
      </div>
    )
  }
}

const mapStateToProps = (state) => ({ article: state.article });                 

const mapDispatchToProps = { getArticle, deleteArticle };                        

export default connect(mapStateToProps, mapDispatchToProps)(InfoPost);        
