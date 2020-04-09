import React from 'react';
import { connect } from 'react-redux';
import { updateArticle } from './../../actions/index';

class EditPost extends React.Component {
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {                                                             
    event.preventDefault();
    const id = this.props.article.id;
    const title = this.state.title ? this.state.title : this.props.article.title;
    const content = this.state.content ? this.state.content : this.props.article.content;
    const author = this.state.author ? this.state.author : this.props.article.author;
    const article = {id: id, title: title, content: content, author: author}
    this.props.updateArticle(article);
  };

  handleCancel = () => {
    this.props.history.push(`/post/${this.props.article.id}`);
  }

  render() {
    return (
      <div className="container py-16 mx-auto padding-top-div">
          <div className=" w-full lg:w-6/12 mx-auto">  
        <h1 className="text-center font-bold text-2xl mb-6">Edit Image</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group mb-4">
            <label>Title</label>
            <input type="text" name="title" defaultValue={this.props.article.title} onChange={this.handleChange} className="form-control" />
          </div>
          <div className="form-group mb-4">
            <label>Content</label>
            <textarea name="content" rows="10" defaultValue={this.props.article.content} onChange={this.handleChange} className="form-control" />
          </div>

          <div className="form-group mb-4">
            <label>Author</label>
            <input type="text" name="author" defaultValue={this.props.article.author} onChange={this.handleChange} className="form-control" />
          </div>

          <div className="btn-group">
            <button type="submit" className="mr-4 btn btn-dark">Update</button>
            <button type="button" onClick={this.handleCancel} className="btn btn-secondary">Cancel</button>
          </div>
        </form>
      </div> 
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ article: state.article });

const mapDispatchToProps = { updateArticle };

export default connect(mapStateToProps, mapDispatchToProps)(EditPost);