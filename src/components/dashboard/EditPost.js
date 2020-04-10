import React from "react";
import { connect } from "react-redux";
import { updatePost } from "../../actions/postActions";
class EditPost extends React.Component {
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    const id = this.props.post.id;
    const title = this.state.title
      ? this.state.title
      : this.props.post.title;
    const content = this.state.content
      ? this.state.content
      : this.props.post.content;
    const author = this.state.author
      ? this.state.author
      : this.props.post.author;
    const post = { id: id, title: title, content: content, author: author };
    this.props.updatePost(post);
  };
  handleCancel = () => {
    this.props.history.push(`/post/${this.props.post.id}`);
  };
  render() {
    return (
      <div className="w-full py-16 mx-auto padding-top-div">
        <div className=" w-10/12 lg:w-6/12 mx-auto">
          <h1 className="text-center font-bold text-2xl mb-6"> Edit Image </h1>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group mb-4">
              <label> Title </label>
              <input
                type="text"
                name="title"
                defaultValue={this.props.post.title}
                onChange={this.handleChange}
                className="form-control"
              />
            </div>
            <div className="form-group mb-4">
              <label> Content </label>
              <textarea
                name="content"
                rows="10"
                defaultValue={this.props.post.content}
                onChange={this.handleChange}
                className="form-control"
              />
            </div>
            <div className="form-group mb-4">
              <label> Author </label>
              <input
                type="text"
                name="author"
                defaultValue={this.props.post.author}
                onChange={this.handleChange}
                className="form-control"
              />
            </div>
            <div className="btn-group">
              <button type="submit" className="mr-4 btn btn-dark">
                Update
              </button>
              <button
                type="button"
                onClick={this.handleCancel}
                className="btn btn-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({ post: state.post });
const mapDispatchToProps = { updatePost };
export default connect(mapStateToProps, mapDispatchToProps)(EditPost);
