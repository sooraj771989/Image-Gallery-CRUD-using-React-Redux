import React from 'react';
import { connect } from 'react-redux';
import { addArticle } from './../../actions/index';                      

class AddPost extends React.Component {
  state = { img:'', title: '', content: '' };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.addArticle(this.state);                                
  };

  render() {
    return (
      <div className="container py-16 mx-auto padding-top-div">
      <div className="w-full lg:w-6/12 mx-auto"> 
        <h4>Add New Image</h4>
        <form onSubmit={ this.handleSubmit }>
          <div className="form-group">
            <input type="text" name="title" required value={this.state.title} onChange={this.handleChange} 
              className="form-control" placeholder="Title" />
          </div>
          <div className="form-group">
            <textarea name="content" rows="5" required value={this.state.content} onChange={this.handleChange} 
              className="form-control" placeholder="Content" />
          </div>
          <button type="submit" className="btn btn-dark">Add New Image</button>
        </form>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = { addArticle };                     

export default connect(null, mapDispatchToProps)(AddPost);  