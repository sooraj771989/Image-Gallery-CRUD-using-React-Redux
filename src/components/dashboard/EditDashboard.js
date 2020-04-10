import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getPosts } from "../../actions/postActions";
class EditDashboard extends Component {
  componentDidMount() {
    this.props.getPosts();
  }
  render() {
    if (this.props.posts.length) {
      return (
        <React.Fragment>
          <div className="w-full flex flex-row py-4 px-4 flex-wrap padding-top-div">
            <div className="w-full  py-6 px-6 text-center text-2xl font-bold">
              Edit Images
            </div>
            {this.props.posts.map((post) => {
              return (
                <React.Fragment>
                  <div className="w-full lg:w-4/12 mb-10 px-0 lg:px-4" key={post.id}>
                    <div className="relative post-image-div">
                      <img alt="gallery-img" src={post.img} className="dashboard-post-image post-images"/>
                      <div className="absolute middle bottom-0 left-0 hidden p-2 mb-5 ml-5 text-sm caption md:block">
                        <p className="text-gray-200"> {post.author} </p>
                      </div>
                    </div>
                    <div className="btn-group mt-4">
                      <Link to={`/post/${post.id}`} className="btn btn-info">
                        View Details
                      </Link>
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </React.Fragment>
      );
    } else {
      return <div> No Articles </div>;
    }
  }
}
EditDashboard.propTypes = {
  getPosts: getPosts.getAllArticles
};
const mapStateToProps = (state) => ({ posts: state.posts });
export default connect(mapStateToProps,{ getPosts })(EditDashboard);
