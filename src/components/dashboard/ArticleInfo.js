import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getArticle, deleteArticle } from './../../actions/index';    

class ArticleInfo extends Component {
  componentDidMount() {                                                         
    this.props.getArticle(this.props.match.params.id);
  }

  render() {
    const article = this.props.article;
    return (
      <div className="container py-16 mx-auto">
      <div className="mt-32  w-full lg:w-6/12 mx-auto"> 
      <div className="justify-center items-center flex flex-col">
        <h2 className="font-bold"><img className="post-edit-image" src={article.img}></img></h2>
        <h2 className="font-bold">{article.title}</h2>
        <p className="text-gray-600">{article.content}</p>
        <div className="btn-group mt-4 mb-4">
          <Link to={{ pathname: `/articles/${article.id}/edit`, state: { article: article } }} className='btn btn-info mr-4 '>  
            Edit
          </Link>
          <button className="btn btn-danger mr-4 " type="button" onClick={() => this.props.deleteArticle(article.id)}>          
            Delete
          </button>
          <Link to="/editdashboard" className="btn btn-primary mr-4 ">Close</Link>                                                 
        </div>
        </div>
      </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({ article: state.article });                 

const mapDispatchToProps = { getArticle, deleteArticle };                        

export default connect(mapStateToProps, mapDispatchToProps)(ArticleInfo);        