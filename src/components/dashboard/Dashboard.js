import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import closeLogo from '../../assets/img/closeIcon.svg';
import Dialog from "@material-ui/core/Dialog";
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.showGalleryImage = this.showGalleryImage.bind(this);
    this.state = {
      settingsopen: false,
      anchorEl: null,
      img: null,
      title: null,
      content: null,
      openDialogData: false
    }
  }
  options = (event) => {
    this.setState({ settingsopen: !this.state.settingsopen, anchorEl: event.currentTarget });
  }
  closedialog = () => {
    this.setState({ openDialogData: false });
  }
  showGalleryImage = (article) => {
    console.log(article);
    const { img, title, content } = article;
    this.setState({ img: img });
    this.setState({ title: title });
    this.setState({ content: content });
    this.setState({ openDialogData: true });
  }
  render() {
    if (this.props.articles.length) {
      return (
        <div className="container flex flex-row py-10 px-10 flex-wrap">
          {this.props.articles.map(article => {
            return (
              <div className="w-full lg:w-4/12 mb-10 px-4 mt-32 " key={article.id}>
                <div className="relative"  >
                  <a className="dashboard-image" onClick={() => this.showGalleryImage(article)}  >
                    <img src={article.img} className="object-cover w-full h-screen remove-project-preview-img" />
                  </a>
                  <div className="absolute bottom-0 left-0 hidden p-2 mb-5 ml-5 text-sm text-white bg-white caption md:block">
                    <p className="text-black">
                      {article.title}   </p>
                  </div>
                </div>
                <p className=" text-gray-600 text-sm mt-4">{article.content}</p>
              </div>
            );
          })}
          <Dialog fullWidth={true} maxWidth={'md'} className="overlay" open={this.state.openDialogData} onClose={this.closedialog} >
            <div className="flex justify-end px-4 py-2">
              <img className='close-icon hover' onClick={this.closedialog} src={closeLogo} alt='Close' />
            </div>
            <div className='container w-10/12 modal-card py-4'>
              <img className="dialog-image" src={this.state.img} />
              <p className="font-bold mt-8">{this.state.title}</p>
              <p className="text-gray-600 mt-4">{this.state.content}</p>
            </div>
          </Dialog>
        </div>
      )
    } else {
      return (<div className="container flex flex-row py-10 px-10 flex-wrap">No Images</div>)
    }
  }
}
const mapStateToProps = (state) => ({ articles: state.articles });
export default connect(mapStateToProps)(Dashboard);
